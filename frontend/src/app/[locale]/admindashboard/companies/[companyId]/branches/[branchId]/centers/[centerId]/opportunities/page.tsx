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
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaFileAlt
} from 'react-icons/fa';

interface Opportunity {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  investmentPurpose: {
    ar: string;
    en: string;
  };
  budget: {
    value: number;
    currency: string;
  };
  duration: {
    value: number;
    unit: string;
  };
  expectedReturn: number;
  status: 'available' | 'in_progress' | 'completed' | 'cancelled';
  investmentConditions: {
    ar: string;
    en: string;
  };
  currentContractsSize: {
    value: number;
    currency: string;
  };
  centerId: string;
  branchId: string;
  companyId: string;
  createdAt: string;
}

interface BreadcrumbData {
  company: { id: string; name: { ar: string; en: string; } };
  branch: { id: string; name: { ar: string; en: string; } };
  center: { id: string; name: { ar: string; en: string; } };
}

export default function OpportunitiesPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;
  const branchId = params.branchId as string;
  const centerId = params.centerId as string;
  
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // نموذج إضافة/تعديل الفرصة الاستثمارية
  const [opportunityForm, setOpportunityForm] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    investmentPurposeAr: '',
    investmentPurposeEn: '',
    budgetValue: '',
    budgetCurrency: 'USD',
    durationValue: '',
    durationUnit: 'months',
    expectedReturn: '',
    status: 'available' as 'available' | 'in_progress' | 'completed' | 'cancelled',
    investmentConditionsAr: '',
    investmentConditionsEn: '',
    currentContractsSizeValue: '',
    currentContractsSizeCurrency: 'USD'
  });

  // تحميل البيانات الوهمية
  useEffect(() => {
    // تحميل بيانات التنقل
    const mockBreadcrumbData: BreadcrumbData = {
      company: { id: companyId, name: { ar: 'شركة الطرق والجسور', en: 'Roads and Bridges Company' } },
      branch: { id: branchId, name: { ar: 'فرع دمشق', en: 'Damascus Branch' } },
      center: { id: centerId, name: { ar: 'مركز المطار', en: 'Airport Center' } }
    };
    setBreadcrumbData(mockBreadcrumbData);

    // تحميل بيانات الفرص الاستثمارية
    const mockOpportunities: Opportunity[] = [
      {
        id: '1',
        name: { ar: 'مشروع توسيع طريق المطار', en: 'Airport Road Expansion Project' },
        description: { ar: 'توسيع وتطوير طريق المطار الدولي بدمشق', en: 'Expansion and development of Damascus International Airport road' },
        investmentPurpose: { ar: 'تحسين البنية التحتية للنقل', en: 'Improving transportation infrastructure' },
        budget: { value: 50000000, currency: 'USD' },
        duration: { value: 18, unit: 'months' },
        expectedReturn: 15,
        status: 'available',
        investmentConditions: { ar: 'شراكة مع القطاع الخاص', en: 'Partnership with private sector' },
        currentContractsSize: { value: 2000000, currency: 'USD' },
        centerId: centerId,
        branchId: branchId,
        companyId: companyId,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: { ar: 'مشروع جسر جديد', en: 'New Bridge Project' },
        description: { ar: 'بناء جسر جديد لتسهيل حركة المرور', en: 'Construction of new bridge to facilitate traffic flow' },
        investmentPurpose: { ar: 'تطوير شبكة النقل', en: 'Developing transportation network' },
        budget: { value: 25000000, currency: 'USD' },
        duration: { value: 12, unit: 'months' },
        expectedReturn: 12,
        status: 'in_progress',
        investmentConditions: { ar: 'تمويل حكومي جزئي', en: 'Partial government funding' },
        currentContractsSize: { value: 1500000, currency: 'USD' },
        centerId: centerId,
        branchId: branchId,
        companyId: companyId,
        createdAt: '2024-02-10'
      }
    ];
    
    setOpportunities(mockOpportunities);
    setLoading(false);
  }, [companyId, branchId, centerId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOpportunityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOpportunity: Opportunity = {
      id: Date.now().toString(),
      name: {
        ar: opportunityForm.nameAr,
        en: opportunityForm.nameEn
      },
      description: {
        ar: opportunityForm.descriptionAr,
        en: opportunityForm.descriptionEn
      },
      investmentPurpose: {
        ar: opportunityForm.investmentPurposeAr,
        en: opportunityForm.investmentPurposeEn
      },
      budget: {
        value: parseFloat(opportunityForm.budgetValue) || 0,
        currency: opportunityForm.budgetCurrency
      },
      duration: {
        value: parseInt(opportunityForm.durationValue) || 0,
        unit: opportunityForm.durationUnit
      },
      expectedReturn: parseFloat(opportunityForm.expectedReturn) || 0,
      status: opportunityForm.status,
      investmentConditions: {
        ar: opportunityForm.investmentConditionsAr,
        en: opportunityForm.investmentConditionsEn
      },
      currentContractsSize: {
        value: parseFloat(opportunityForm.currentContractsSizeValue) || 0,
        currency: opportunityForm.currentContractsSizeCurrency
      },
      centerId: centerId,
      branchId: branchId,
      companyId: companyId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (modalType === 'add') {
      setOpportunities(prev => [...prev, newOpportunity]);
      alert('تم إضافة الفرصة الاستثمارية بنجاح!');
    } else if (modalType === 'edit' && selectedOpportunity) {
      setOpportunities(prev => prev.map(opportunity => 
        opportunity.id === selectedOpportunity.id ? { ...newOpportunity, id: selectedOpportunity.id } : opportunity
      ));
      alert('تم تحديث الفرصة الاستثمارية بنجاح!');
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setOpportunityForm({
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      investmentPurposeAr: '',
      investmentPurposeEn: '',
      budgetValue: '',
      budgetCurrency: 'USD',
      durationValue: '',
      durationUnit: 'months',
      expectedReturn: '',
      status: 'available',
      investmentConditionsAr: '',
      investmentConditionsEn: '',
      currentContractsSizeValue: '',
      currentContractsSizeCurrency: 'USD'
    });
    setSelectedOpportunity(null);
  };

  const handleAdd = () => {
    setModalType('add');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (opportunity: Opportunity) => {
    setModalType('edit');
    setSelectedOpportunity(opportunity);
    setOpportunityForm({
      nameAr: opportunity.name.ar,
      nameEn: opportunity.name.en,
      descriptionAr: opportunity.description.ar,
      descriptionEn: opportunity.description.en,
      investmentPurposeAr: opportunity.investmentPurpose.ar,
      investmentPurposeEn: opportunity.investmentPurpose.en,
      budgetValue: opportunity.budget.value.toString(),
      budgetCurrency: opportunity.budget.currency,
      durationValue: opportunity.duration.value.toString(),
      durationUnit: opportunity.duration.unit,
      expectedReturn: opportunity.expectedReturn.toString(),
      status: opportunity.status,
      investmentConditionsAr: opportunity.investmentConditions.ar,
      investmentConditionsEn: opportunity.investmentConditions.en,
      currentContractsSizeValue: opportunity.currentContractsSize.value.toString(),
      currentContractsSizeCurrency: opportunity.currentContractsSize.currency
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفرصة الاستثمارية؟')) {
      setOpportunities(prev => prev.filter(opportunity => opportunity.id !== id));
      alert('تم حذف الفرصة الاستثمارية بنجاح!');
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.ar.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || opportunity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('ar-SY', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/admindashboard/companies" className="hover:text-blue-600">
              إدارة الشركات
            </Link>
            <FaArrowRight className="text-xs" />
            <Link href={`/admindashboard/companies/${companyId}/branches`} className="hover:text-blue-600">
              {breadcrumbData?.company.name.ar}
            </Link>
            <FaArrowRight className="text-xs" />
            <Link href={`/admindashboard/companies/${companyId}/branches/${branchId}/centers`} className="hover:text-blue-600">
              {breadcrumbData?.branch.name.ar}
            </Link>
            <FaArrowRight className="text-xs" />
            <span className="text-gray-900">{breadcrumbData?.center.name.ar}</span>
            <FaArrowRight className="text-xs" />
            <span className="text-gray-900">الفرص الاستثمارية</span>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                فرص {breadcrumbData?.center.name.ar}
              </h1>
              <p className="text-gray-600">
                إدارة الفرص الاستثمارية المتاحة في المركز
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              إضافة فرصة جديدة
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الفرص الاستثمارية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="available">متاح</option>
                  <option value="in_progress">قيد التنفيذ</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {opportunity.name.ar}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {opportunity.name.en}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                      {getStatusText(opportunity.status)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {opportunity.description.ar}
                  </p>

                  {/* الإحصائيات المالية */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الميزانية:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(opportunity.budget.value, opportunity.budget.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">العائد المتوقع:</span>
                      <span className="font-medium text-green-600">
                        {opportunity.expectedReturn}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">المدة:</span>
                      <span className="font-medium text-gray-900">
                        {opportunity.duration.value} {opportunity.duration.unit === 'months' ? 'شهر' : 'سنة'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">حجم العقود:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(opportunity.currentContractsSize.value, opportunity.currentContractsSize.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalType('view')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <FaEye />
                      عرض التفاصيل
                    </button>
                    <button
                      onClick={() => handleEdit(opportunity)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(opportunity.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <FaMoneyBillWave className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فرص استثمارية</h3>
              <p className="text-gray-500 mb-4">لم يتم العثور على أي فرص استثمارية مطابقة لبحثك</p>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة فرصة جديدة
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
                    {modalType === 'add' ? 'إضافة فرصة استثمارية جديدة' : 'تعديل الفرصة الاستثمارية'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم الفرصة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الفرصة (عربي) *
                      </label>
                      <input
                        type="text"
                        name="nameAr"
                        value={opportunityForm.nameAr}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        اسم الفرصة (إنجليزي) *
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={opportunityForm.nameEn}
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
                        الوصف (عربي) *
                      </label>
                      <textarea
                        name="descriptionAr"
                        value={opportunityForm.descriptionAr}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الوصف (إنجليزي) *
                      </label>
                      <textarea
                        name="descriptionEn"
                        value={opportunityForm.descriptionEn}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* غرض الاستثمار */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        غرض الاستثمار (عربي)
                      </label>
                      <textarea
                        name="investmentPurposeAr"
                        value={opportunityForm.investmentPurposeAr}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        غرض الاستثمار (إنجليزي)
                      </label>
                      <textarea
                        name="investmentPurposeEn"
                        value={opportunityForm.investmentPurposeEn}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* الميزانية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        الميزانية (القيمة) *
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="budgetValue"
                        value={opportunityForm.budgetValue}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        العملة
                      </label>
                      <select
                        name="budgetCurrency"
                        value={opportunityForm.budgetCurrency}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                        <option value="SYP">ليرة سورية (SYP)</option>
                      </select>
                    </div>
                  </div>

                  {/* المدة والعائد */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        مدة المشروع
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="durationValue"
                          value={opportunityForm.durationValue}
                          onChange={handleFormChange}
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                        <select
                          name="durationUnit"
                          value={opportunityForm.durationUnit}
                          onChange={handleFormChange}
                          className="w-24 p-2 border border-gray-300 rounded-md"
                        >
                          <option value="months">شهر</option>
                          <option value="years">سنة</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        العائد المتوقع (%)
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="expectedReturn"
                        value={opportunityForm.expectedReturn}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* حجم العقود الحالية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        حجم العقود الحالية (القيمة)
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="currentContractsSizeValue"
                        value={opportunityForm.currentContractsSizeValue}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        العملة
                      </label>
                      <select
                        name="currentContractsSizeCurrency"
                        value={opportunityForm.currentContractsSizeCurrency}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                        <option value="SYP">ليرة سورية (SYP)</option>
                      </select>
                    </div>
                  </div>

                  {/* شروط الاستثمار */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        شروط الاستثمار (عربي)
                      </label>
                      <textarea
                        name="investmentConditionsAr"
                        value={opportunityForm.investmentConditionsAr}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        شروط الاستثمار (إنجليزي)
                      </label>
                      <textarea
                        name="investmentConditionsEn"
                        value={opportunityForm.investmentConditionsEn}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* حالة الفرصة */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      حالة الفرصة
                    </label>
                    <select
                      name="status"
                      value={opportunityForm.status}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="available">متاح</option>
                      <option value="in_progress">قيد التنفيذ</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {modalType === 'add' ? 'إضافة الفرصة' : 'حفظ التغييرات'}
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
