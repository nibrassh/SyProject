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
  FaIndustry,
  FaCogs
} from 'react-icons/fa';

interface Center {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  description?: {
    ar: string;
    en: string;
  };
  location: [number, number];
  numberOfEmployees: number;
  opportunities: string[];
  theoreticalCapacity: {
    value: number;
    unit: string;
  };
  actualCapacity: {
    value: number;
    unit: string;
  };
  technicalReadiness: number;
  request: 'free' | 'reverc' | 'agree';
  branchId: string;
  companyId: string;
  createdAt: string;
}

interface BreadcrumbData {
  company: { id: string; name: { ar: string; en: string; } };
  branch: { id: string; name: { ar: string; en: string; } };
}

export default function CentersPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;
  const branchId = params.branchId as string;
  
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null);
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  // نموذج إضافة/تعديل المركز
  const [centerForm, setCenterForm] = useState({
    nameAr: '',
    nameEn: '',
    addressAr: '',
    addressEn: '',
    descriptionAr: '',
    descriptionEn: '',
    latitude: '',
    longitude: '',
    numberOfEmployees: '',
    theoreticalCapacityValue: '',
    theoreticalCapacityUnit: '',
    actualCapacityValue: '',
    actualCapacityUnit: '',
    technicalReadiness: '',
    request: 'free' as 'free' | 'reverc' | 'agree'
  });

  // تحميل البيانات الوهمية
  useEffect(() => {
    // تحميل بيانات التنقل
    const mockBreadcrumbData: BreadcrumbData = {
      company: { id: companyId, name: { ar: 'شركة الطرق والجسور', en: 'Roads and Bridges Company' } },
      branch: { id: branchId, name: { ar: 'فرع دمشق', en: 'Damascus Branch' } }
    };
    setBreadcrumbData(mockBreadcrumbData);

    // تحميل بيانات المراكز
    const mockCenters: Center[] = [
      {
        id: '1',
        name: { ar: 'مركز المطار', en: 'Airport Center' },
        address: { ar: 'طريق المطار، دمشق', en: 'Airport Road, Damascus' },
        description: { ar: 'مركز متخصص في مشاريع المطار', en: 'Center specialized in airport projects' },
        location: [33.4114, 36.5156],
        numberOfEmployees: 25,
        opportunities: ['opp1', 'opp2'],
        theoreticalCapacity: { value: 1000, unit: 'طن/شهر' },
        actualCapacity: { value: 750, unit: 'طن/شهر' },
        technicalReadiness: 85,
        request: 'free',
        branchId: branchId,
        companyId: companyId,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: { ar: 'مركز صحنايا', en: 'Sahnaya Center' },
        address: { ar: 'صحنايا، ريف دمشق', en: 'Sahnaya, Damascus Countryside' },
        description: { ar: 'مركز للمشاريع الإقليمية', en: 'Center for regional projects' },
        location: [33.3689, 36.1453],
        numberOfEmployees: 18,
        opportunities: ['opp3'],
        theoreticalCapacity: { value: 500, unit: 'طن/شهر' },
        actualCapacity: { value: 400, unit: 'طن/شهر' },
        technicalReadiness: 70,
        request: 'agree',
        branchId: branchId,
        companyId: companyId,
        createdAt: '2024-02-10'
      }
    ];
    
    setCenters(mockCenters);
    setLoading(false);
  }, [companyId, branchId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCenterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCenter: Center = {
      id: Date.now().toString(),
      name: {
        ar: centerForm.nameAr,
        en: centerForm.nameEn
      },
      address: {
        ar: centerForm.addressAr,
        en: centerForm.addressEn
      },
      description: {
        ar: centerForm.descriptionAr,
        en: centerForm.descriptionEn
      },
      location: [parseFloat(centerForm.latitude), parseFloat(centerForm.longitude)],
      numberOfEmployees: parseInt(centerForm.numberOfEmployees) || 0,
      opportunities: [],
      theoreticalCapacity: {
        value: parseFloat(centerForm.theoreticalCapacityValue) || 0,
        unit: centerForm.theoreticalCapacityUnit
      },
      actualCapacity: {
        value: parseFloat(centerForm.actualCapacityValue) || 0,
        unit: centerForm.actualCapacityUnit
      },
      technicalReadiness: parseFloat(centerForm.technicalReadiness) || 0,
      request: centerForm.request,
      branchId: branchId,
      companyId: companyId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (modalType === 'add') {
      setCenters(prev => [...prev, newCenter]);
      alert('تم إضافة المركز بنجاح!');
    } else if (modalType === 'edit' && selectedCenter) {
      setCenters(prev => prev.map(center => 
        center.id === selectedCenter.id ? { ...newCenter, id: selectedCenter.id } : center
      ));
      alert('تم تحديث المركز بنجاح!');
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCenterForm({
      nameAr: '',
      nameEn: '',
      addressAr: '',
      addressEn: '',
      descriptionAr: '',
      descriptionEn: '',
      latitude: '',
      longitude: '',
      numberOfEmployees: '',
      theoreticalCapacityValue: '',
      theoreticalCapacityUnit: '',
      actualCapacityValue: '',
      actualCapacityUnit: '',
      technicalReadiness: '',
      request: 'free'
    });
    setSelectedCenter(null);
  };

  const handleAdd = () => {
    setModalType('add');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (center: Center) => {
    setModalType('edit');
    setSelectedCenter(center);
    setCenterForm({
      nameAr: center.name.ar,
      nameEn: center.name.en,
      addressAr: center.address.ar,
      addressEn: center.address.en,
      descriptionAr: center.description?.ar || '',
      descriptionEn: center.description?.en || '',
      latitude: center.location[0].toString(),
      longitude: center.location[1].toString(),
      numberOfEmployees: center.numberOfEmployees.toString(),
      theoreticalCapacityValue: center.theoreticalCapacity.value.toString(),
      theoreticalCapacityUnit: center.theoreticalCapacity.unit,
      actualCapacityValue: center.actualCapacity.value.toString(),
      actualCapacityUnit: center.actualCapacity.unit,
      technicalReadiness: center.technicalReadiness.toString(),
      request: center.request
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المركز؟')) {
      setCenters(prev => prev.filter(center => center.id !== id));
      alert('تم حذف المركز بنجاح!');
    }
  };

  const handleViewOpportunities = (centerId: string) => {
    router.push(`/admindashboard/companies/${companyId}/branches/${branchId}/centers/${centerId}/opportunities`);
  };

  const filteredCenters = centers.filter(center =>
    center.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.ar.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return 'text-green-600';
    if (readiness >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
              <Link href={`/admindashboard/companies/${companyId}/branches`} className="text-blue-600 hover:text-blue-800 font-medium">
                {breadcrumbData?.company.name.ar}
              </Link>
              <FaArrowRight className="text-xs text-gray-400" />
              <span className="text-gray-900 font-medium">{breadcrumbData?.branch.name.ar}</span>
              <FaArrowRight className="text-xs text-gray-400" />
              <span className="text-blue-600 font-medium">المراكز ({centers.length})</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مراكز {breadcrumbData?.branch.name.ar}
              </h1>
              <p className="text-gray-600">
                إدارة مراكز الفرع والفرص الاستثمارية
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              إضافة مركز جديد
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في المراكز..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Centers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <div key={center.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {center.name.ar}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {center.name.en}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="ml-1" />
                        {center.address.ar}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center.request)}`}>
                      {getStatusText(center.request)}
                    </span>
                  </div>

                  {center.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {center.description.ar}
                    </p>
                  )}

                  {/* الإحصائيات */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الجاهزية الفنية:</span>
                      <span className={`font-medium ${getReadinessColor(center.technicalReadiness)}`}>
                        {center.technicalReadiness}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الطاقة النظرية:</span>
                      <span className="font-medium text-gray-900">
                        {center.theoreticalCapacity.value} {center.theoreticalCapacity.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الطاقة الفعلية:</span>
                      <span className="font-medium text-gray-900">
                        {center.actualCapacity.value} {center.actualCapacity.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaUsers className="ml-1" />
                      {center.numberOfEmployees} موظف
                    </div>
                    <div className="flex items-center">
                      <FaIndustry className="ml-1" />
                      {center.opportunities.length} فرصة
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewOpportunities(center.id)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <FaEye />
                      عرض الفرص
                    </button>
                    <button
                      onClick={() => handleEdit(center)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(center.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <FaCogs className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مراكز</h3>
              <p className="text-gray-500 mb-4">لم يتم العثور على أي مراكز مطابقة لبحثك</p>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة مركز جديد
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {modalType === 'add' ? 'إضافة مركز جديد' : 'تعديل المركز'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم المركز */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم المركز (عربي) *
                      </label>
                      <input
                        type="text"
                        name="nameAr"
                        value={centerForm.nameAr}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم المركز (إنجليزي) *
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={centerForm.nameEn}
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
                        value={centerForm.addressAr}
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
                        value={centerForm.addressEn}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* الوصف */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف (عربي)
                      </label>
                      <textarea
                        name="descriptionAr"
                        value={centerForm.descriptionAr}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف (إنجليزي)
                      </label>
                      <textarea
                        name="descriptionEn"
                        value={centerForm.descriptionEn}
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
                        value={centerForm.latitude}
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
                        value={centerForm.longitude}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* الطاقة النظرية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الطاقة النظرية (القيمة)
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="theoreticalCapacityValue"
                        value={centerForm.theoreticalCapacityValue}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الطاقة النظرية (الوحدة)
                      </label>
                      <input
                        type="text"
                        name="theoreticalCapacityUnit"
                        value={centerForm.theoreticalCapacityUnit}
                        onChange={handleFormChange}
                        placeholder="مثال: طن/شهر"
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                  </div>

                  {/* الطاقة الفعلية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الطاقة الفعلية (القيمة)
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="actualCapacityValue"
                        value={centerForm.actualCapacityValue}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الطاقة الفعلية (الوحدة)
                      </label>
                      <input
                        type="text"
                        name="actualCapacityUnit"
                        value={centerForm.actualCapacityUnit}
                        onChange={handleFormChange}
                        placeholder="مثال: طن/شهر"
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                  </div>

                  {/* الجاهزية الفنية وعدد الموظفين */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الجاهزية الفنية (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="technicalReadiness"
                        value={centerForm.technicalReadiness}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        عدد الموظفين
                      </label>
                      <input
                        type="number"
                        name="numberOfEmployees"
                        value={centerForm.numberOfEmployees}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* حالة الطلب */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      حالة الطلب
                    </label>
                    <select
                      name="request"
                      value={centerForm.request}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="free">متاح</option>
                      <option value="reverc">قيد المراجعة</option>
                      <option value="agree">موافق عليه</option>
                    </select>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {modalType === 'add' ? 'إضافة المركز' : 'حفظ التغييرات'}
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
