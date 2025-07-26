"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaEye,
  FaArrowRight,
  FaMapMarkerAlt,
  FaUsers,
  FaBuilding
} from 'react-icons/fa';

interface Branch {
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
  centers: string[];
  image?: any;
  request: 'free' | 'reverc' | 'agree';
  companyId: string;
  createdAt: string;
}

interface Company {
  id: string;
  name: {
    ar: string;
    en: string;
  };
}

export default function BranchesPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;
  
  const [company, setCompany] = useState<Company | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // نموذج إضافة/تعديل الفرع
  const [branchForm, setBranchForm] = useState({
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
    // تحميل بيانات الشركة
    const mockCompany: Company = {
      id: companyId,
      name: { ar: 'شركة الطرق والجسور', en: 'Roads and Bridges Company' }
    };
    setCompany(mockCompany);

    // تحميل بيانات الفروع
    const mockBranches: Branch[] = [
      {
        id: '1',
        name: { ar: 'فرع دمشق', en: 'Damascus Branch' },
        address: { ar: 'دمشق، المزة', en: 'Damascus, Mazzeh' },
        shortdescription: { ar: 'الفرع الرئيسي في دمشق', en: 'Main branch in Damascus' },
        location: [33.5138, 36.2765],
        numberOfEmployees: 75,
        centers: ['center1', 'center2'],
        request: 'free',
        companyId: companyId,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: { ar: 'فرع حمص', en: 'Homs Branch' },
        address: { ar: 'حمص، الوعر', en: 'Homs, Al-Waer' },
        shortdescription: { ar: 'فرع حمص للمشاريع الإقليمية', en: 'Homs branch for regional projects' },
        location: [34.7324, 36.7132],
        numberOfEmployees: 45,
        centers: ['center3'],
        request: 'agree',
        companyId: companyId,
        createdAt: '2024-02-10'
      }
    ];
    
    setBranches(mockBranches);
    setLoading(false);
  }, [companyId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setBranchForm(prev => ({
        ...prev,
        [name]: fileInput.files?.[0] || null
      }));
    } else {
      setBranchForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: {
        ar: branchForm.nameAr,
        en: branchForm.nameEn
      },
      address: {
        ar: branchForm.addressAr,
        en: branchForm.addressEn
      },
      shortdescription: {
        ar: branchForm.shortDescriptionAr,
        en: branchForm.shortDescriptionEn
      },
      longdescription: {
        ar: branchForm.longDescriptionAr,
        en: branchForm.longDescriptionEn
      },
      location: [parseFloat(branchForm.latitude), parseFloat(branchForm.longitude)],
      numberOfEmployees: parseInt(branchForm.numberOfEmployees) || 0,
      centers: [],
      request: branchForm.request,
      companyId: companyId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (modalType === 'add') {
      setBranches(prev => [...prev, newBranch]);
      alert('تم إضافة الفرع بنجاح!');
    } else if (modalType === 'edit' && selectedBranch) {
      setBranches(prev => prev.map(branch => 
        branch.id === selectedBranch.id ? { ...newBranch, id: selectedBranch.id } : branch
      ));
      alert('تم تحديث الفرع بنجاح!');
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setBranchForm({
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
    setSelectedBranch(null);
  };

  const handleAdd = () => {
    setModalType('add');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (branch: Branch) => {
    setModalType('edit');
    setSelectedBranch(branch);
    setBranchForm({
      nameAr: branch.name.ar,
      nameEn: branch.name.en,
      addressAr: branch.address.ar,
      addressEn: branch.address.en,
      shortDescriptionAr: branch.shortdescription?.ar || '',
      shortDescriptionEn: branch.shortdescription?.en || '',
      longDescriptionAr: branch.longdescription?.ar || '',
      longDescriptionEn: branch.longdescription?.en || '',
      latitude: branch.location[0].toString(),
      longitude: branch.location[1].toString(),
      numberOfEmployees: branch.numberOfEmployees.toString(),
      image: null,
      request: branch.request
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
      setBranches(prev => prev.filter(branch => branch.id !== id));
      alert('تم حذف الفرع بنجاح!');
    }
  };

  const handleViewCenters = (branchId: string) => {
    router.push(`/admindashboard/companies/${companyId}/branches/${branchId}/centers`);
  };

  const handleAddCenter = (branchId: string) => {
    router.push(`/admindashboard/companies/${companyId}/branches/${branchId}/centers?action=add`);
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.ar.toLowerCase().includes(searchTerm.toLowerCase())
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
          {/* Breadcrumb */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/admindashboard/companies" className="text-blue-600 hover:text-blue-800 font-medium">
                إدارة الشركات
              </Link>
              <FaArrowRight className="text-xs text-gray-400" />
              <span className="text-gray-900 font-medium">{company?.name.ar}</span>
              <FaArrowRight className="text-xs text-gray-400" />
              <span className="text-blue-600 font-medium">الفروع ({branches.length})</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                فروع {company?.name.ar}
              </h1>
              <p className="text-gray-600">
                إدارة فروع الشركة ومراكزها
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              إضافة فرع جديد
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الفروع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {branch.name.ar}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {branch.name.en}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="ml-1" />
                        {branch.address.ar}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(branch.request)}`}>
                      {getStatusText(branch.request)}
                    </span>
                  </div>

                  {branch.shortdescription && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {branch.shortdescription.ar}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaUsers className="ml-1" />
                      {branch.numberOfEmployees} موظف
                    </div>
                    <div className="flex items-center">
                      <FaBuilding className="ml-1" />
                      {branch.centers.length} مركز
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewCenters(branch.id)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                      >
                        <FaBuilding />
                        إدارة المراكز ({branch.centers.length})
                      </button>
                      <button
                        onClick={() => handleAddCenter(branch.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
                        title="إضافة مركز جديد"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                        title="تعديل الفرع"
                      >
                        <FaEdit />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                        title="حذف الفرع"
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

          {filteredBranches.length === 0 && (
            <div className="text-center py-12">
              <FaBuilding className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فروع</h3>
              <p className="text-gray-500 mb-4">لم يتم العثور على أي فروع مطابقة لبحثك</p>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة فرع جديد
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
                    {modalType === 'add' ? 'إضافة فرع جديد' : 'تعديل الفرع'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم الفرع */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الفرع (عربي) *
                      </label>
                      <input
                        type="text"
                        name="nameAr"
                        value={branchForm.nameAr}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الفرع (إنجليزي) *
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={branchForm.nameEn}
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
                        value={branchForm.addressAr}
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
                        value={branchForm.addressEn}
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
                        value={branchForm.shortDescriptionAr}
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
                        value={branchForm.shortDescriptionEn}
                        onChange={handleFormChange}
                        rows={3}
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
                        value={branchForm.latitude}
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
                        value={branchForm.longitude}
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
                        value={branchForm.numberOfEmployees}
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
                        value={branchForm.request}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="free">متاح</option>
                        <option value="reverc">قيد المراجعة</option>
                        <option value="agree">موافق عليه</option>
                      </select>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {modalType === 'add' ? 'إضافة الفرع' : 'حفظ التغييرات'}
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
