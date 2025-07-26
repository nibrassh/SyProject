"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaCodeBranch
} from 'react-icons/fa';

interface Company {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  shortdescription?: {
    ar: string;
    en: string;
  };
  longdescription?: {
    ar: string;
    en: string;
  };
  location: [number, number];
  numberOfEmployees: number;
  branches: string[];
  image?: any;
  request: 'free' | 'reverc' | 'agree';
  createdAt: string;
}

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // نموذج إضافة/تعديل الشركة
  const [companyForm, setCompanyForm] = useState({
    nameAr: '',
    nameEn: '',
    addressAr: '',
    addressEn: '',
    shortDescriptionAr: '',
    shortDescriptionEn: '',
    longDescriptionAr: '',
    longDescriptionEn: '',
    latitude: '',
    longitude: '',
    numberOfEmployees: '',
    image: null as File | null,
    request: 'free' as 'free' | 'reverc' | 'agree'
  });

  // تحميل البيانات الوهمية
  useEffect(() => {
    const mockCompanies: Company[] = [
      {
        id: '1',
        name: { ar: 'شركة الطرق والجسور', en: 'Roads and Bridges Company' },
        address: { ar: 'دمشق، المزة', en: 'Damascus, Mazzeh' },
        shortdescription: { ar: 'شركة متخصصة في بناء الطرق والجسور', en: 'Company specialized in roads and bridges construction' },
        location: [33.5138, 36.2765],
        numberOfEmployees: 150,
        branches: ['branch1', 'branch2'],
        request: 'free',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: { ar: 'شركة الإسكان والتعمير', en: 'Housing and Construction Company' },
        address: { ar: 'حلب، الفرقان', en: 'Aleppo, Al-Furqan' },
        shortdescription: { ar: 'شركة متخصصة في مشاريع الإسكان', en: 'Company specialized in housing projects' },
        location: [36.2021, 37.1343],
        numberOfEmployees: 200,
        branches: ['branch3'],
        request: 'agree',
        createdAt: '2024-02-10'
      }
    ];
    
    setCompanies(mockCompanies);
    setLoading(false);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setCompanyForm(prev => ({
        ...prev,
        [name]: fileInput.files?.[0] || null
      }));
    } else {
      setCompanyForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCompany: Company = {
      id: Date.now().toString(),
      name: {
        ar: companyForm.nameAr,
        en: companyForm.nameEn
      },
      address: {
        ar: companyForm.addressAr,
        en: companyForm.addressEn
      },
      shortdescription: {
        ar: companyForm.shortDescriptionAr,
        en: companyForm.shortDescriptionEn
      },
      longdescription: {
        ar: companyForm.longDescriptionAr,
        en: companyForm.longDescriptionEn
      },
      location: [parseFloat(companyForm.latitude), parseFloat(companyForm.longitude)],
      numberOfEmployees: parseInt(companyForm.numberOfEmployees) || 0,
      branches: [],
      request: companyForm.request,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (modalType === 'add') {
      setCompanies(prev => [...prev, newCompany]);
      alert('تم إضافة الشركة بنجاح!');
    } else if (modalType === 'edit' && selectedCompany) {
      setCompanies(prev => prev.map(company => 
        company.id === selectedCompany.id ? { ...newCompany, id: selectedCompany.id } : company
      ));
      alert('تم تحديث الشركة بنجاح!');
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCompanyForm({
      nameAr: '',
      nameEn: '',
      addressAr: '',
      addressEn: '',
      shortDescriptionAr: '',
      shortDescriptionEn: '',
      longDescriptionAr: '',
      longDescriptionEn: '',
      latitude: '',
      longitude: '',
      numberOfEmployees: '',
      image: null,
      request: 'free'
    });
    setSelectedCompany(null);
  };

  const handleAdd = () => {
    setModalType('add');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (company: Company) => {
    setModalType('edit');
    setSelectedCompany(company);
    setCompanyForm({
      nameAr: company.name.ar,
      nameEn: company.name.en,
      addressAr: company.address.ar,
      addressEn: company.address.en,
      shortDescriptionAr: company.shortdescription?.ar || '',
      shortDescriptionEn: company.shortdescription?.en || '',
      longDescriptionAr: company.longdescription?.ar || '',
      longDescriptionEn: company.longdescription?.en || '',
      latitude: company.location[0].toString(),
      longitude: company.location[1].toString(),
      numberOfEmployees: company.numberOfEmployees.toString(),
      image: null,
      request: company.request
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشركة؟')) {
      setCompanies(prev => prev.filter(company => company.id !== id));
      alert('تم حذف الشركة بنجاح!');
    }
  };

  const handleViewBranches = (companyId: string) => {
    router.push(`/admindashboard/companies/${companyId}/branches`);
  };

  const handleAddBranch = (companyId: string) => {
    router.push(`/admindashboard/companies/${companyId}/branches?action=add`);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'reverc': return 'bg-yellow-100 text-yellow-800';
      case 'agree': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'free': return 'متاح';
      case 'reverc': return 'قيد المراجعة';
      case 'agree': return 'موافق عليه';
      default: return status;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                إدارة الشركات
              </h1>
              <p className="text-gray-600">
                إدارة الشركات والمؤسسات المسجلة في النظام
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              إضافة شركة جديدة
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الشركات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {company.name.ar}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {company.name.en}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="ml-1" />
                        {company.address.ar}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.request)}`}>
                      {getStatusText(company.request)}
                    </span>
                  </div>

                  {company.shortdescription && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {company.shortdescription.ar}
                    </p>
                  )}

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaUsers className="ml-1" />
                      {company.numberOfEmployees} موظف
                    </div>
                    <div className="flex items-center">
                      <FaCodeBranch className="ml-1" />
                      {company.branches.length} فرع
                    </div>
                    <div className="flex items-center">
                      <FaBuilding className="ml-1" />
                      {company.branches.reduce((total, branch) => total + (branch.centers?.length || 0), 0)} مركز
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewBranches(company.id)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                      >
                        <FaCodeBranch />
                        إدارة الفروع ({company.branches.length})
                      </button>
                      <button
                        onClick={() => handleAddBranch(company.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
                        title="إضافة فرع جديد"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                        title="تعديل الشركة"
                      >
                        <FaEdit />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                        title="حذف الشركة"
                      >
                        <FaTrash />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <FaBuilding className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شركات</h3>
              <p className="text-gray-500 mb-4">لم يتم العثور على أي شركات مطابقة لبحثك</p>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة شركة جديدة
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {modalType === 'add' ? 'إضافة شركة جديدة' : 'تعديل الشركة'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم الشركة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الشركة (عربي) *
                      </label>
                      <input
                        type="text"
                        name="nameAr"
                        value={companyForm.nameAr}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الشركة (إنجليزي) *
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={companyForm.nameEn}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* العنوان */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        العنوان (عربي) *
                      </label>
                      <input
                        type="text"
                        name="addressAr"
                        value={companyForm.addressAr}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        العنوان (إنجليزي) *
                      </label>
                      <input
                        type="text"
                        name="addressEn"
                        value={companyForm.addressEn}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* الوصف المختصر */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف المختصر (عربي)
                      </label>
                      <textarea
                        name="shortDescriptionAr"
                        value={companyForm.shortDescriptionAr}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف المختصر (إنجليزي)
                      </label>
                      <textarea
                        name="shortDescriptionEn"
                        value={companyForm.shortDescriptionEn}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* الوصف المفصل */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف المفصل (عربي)
                      </label>
                      <textarea
                        name="longDescriptionAr"
                        value={companyForm.longDescriptionAr}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف المفصل (إنجليزي)
                      </label>
                      <textarea
                        name="longDescriptionEn"
                        value={companyForm.longDescriptionEn}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* الموقع الجغرافي */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        خط العرض *
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={companyForm.latitude}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        خط الطول *
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={companyForm.longitude}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* عدد الموظفين والحالة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        عدد الموظفين
                      </label>
                      <input
                        type="number"
                        name="numberOfEmployees"
                        value={companyForm.numberOfEmployees}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        حالة الطلب
                      </label>
                      <select
                        name="request"
                        value={companyForm.request}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="free">متاح</option>
                        <option value="reverc">قيد المراجعة</option>
                        <option value="agree">موافق عليه</option>
                      </select>
                    </div>
                  </div>

                  {/* صورة الشركة */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      صورة الشركة
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFormChange}
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {modalType === 'add' ? 'إضافة الشركة' : 'حفظ التغييرات'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
