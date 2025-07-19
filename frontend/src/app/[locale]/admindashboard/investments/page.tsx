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
  FaFilter,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt
} from 'react-icons/fa';

interface Investment {
  id: string | number;
  companyName: string;
  branchName: string;
  location: string;
  investmentAmount: number;
  expectedReturn: number;
  duration: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  createdDate: string;
  description: string;
  category: string;
  // حقول إضافية من النموذج
  centerName?: string;
  opportunityTitle?: string;
  investmentPurpose?: string;
  isActive?: boolean;
  allowApplications?: boolean;
}

export default function InvestmentsPage() {
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'add'>('view');
  const [formStep, setFormStep] = useState(1); // خطوة النموذج الحالية

  // نموذج إضافة الاستثمار
  const [investmentForm, setInvestmentForm] = useState({
    // بيانات الشركة
    companyName: '',
    companyType: '',
    companyLocation: '',

    // بيانات الفرع
    branchName: '',
    branchCity: '',
    branchLatitude: '',
    branchLongitude: '',

    // بيانات المركز
    centerName: '',
    centerAddress: '',
    centerImage: null as File | null,
    centerDescription: '',

    // تفاصيل الفرصة الاستثمارية
    opportunityTitle: '',
    opportunityDescription: '',
    investmentPurpose: '',
    investmentDuration: '',
    expectedAnnualReturn: '',
    investmentConditions: '',
    currentContractsSize: '',
    employeesCount: '',
    employeesSpecialties: '',
    fixedAssets: '',
    equipment: '',
    financialObligations: '',
    lastBalance: '',

    // ملفات مرفقة
    locationImages: [] as File[],
    balanceFile: null as File | null,
    detailsPdf: null as File | null,

    // التحكم
    isActive: true,
    allowApplications: true
  });

  useEffect(() => {
    // محاكاة جلب بيانات الاستثمارات
    const fetchInvestments = async () => {
      try {
        setTimeout(() => {
          const mockInvestments: Investment[] = [
            {
              id: '1',
              companyName: 'شركة التقنية المتقدمة',
              branchName: 'فرع الرياض الرئيسي',
              location: 'الرياض، المملكة العربية السعودية',
              investmentAmount: 500000,
              expectedReturn: 15.5,
              duration: 24,
              status: 'active',
              createdDate: '2024-01-15',
              description: 'استثمار في تطوير تطبيقات الذكاء الاصطناعي',
              category: 'تقنية'
            },
            {
              id: '2',
              companyName: 'مجموعة الاستثمار الذكي',
              branchName: 'فرع جدة',
              location: 'جدة، المملكة العربية السعودية',
              investmentAmount: 750000,
              expectedReturn: 18.2,
              duration: 36,
              status: 'pending',
              createdDate: '2024-01-10',
              description: 'استثمار في مشاريع الطاقة المتجددة',
              category: 'طاقة'
            },
            {
              id: '3',
              companyName: 'شركة الابتكار الرقمي',
              branchName: 'فرع الدمام',
              location: 'الدمام، المملكة العربية السعودية',
              investmentAmount: 300000,
              expectedReturn: 12.8,
              duration: 18,
              status: 'completed',
              createdDate: '2023-12-01',
              description: 'استثمار في منصات التجارة الإلكترونية',
              category: 'تجارة إلكترونية'
            },
            {
              id: '4',
              companyName: 'مؤسسة النمو المستدام',
              branchName: 'فرع المدينة المنورة',
              location: 'المدينة المنورة، المملكة العربية السعودية',
              investmentAmount: 450000,
              expectedReturn: 14.0,
              duration: 30,
              status: 'active',
              createdDate: '2024-01-05',
              description: 'استثمار في مشاريع الزراعة المستدامة',
              category: 'زراعة'
            },
            {
              id: '5',
              companyName: 'شركة المستقبل التقني',
              branchName: 'فرع الخبر',
              location: 'الخبر، المملكة العربية السعودية',
              investmentAmount: 600000,
              expectedReturn: 16.5,
              duration: 42,
              status: 'cancelled',
              createdDate: '2023-12-20',
              description: 'استثمار في تطوير تقنيات البلوك تشين',
              category: 'تقنية'
            }
          ];
          setInvestments(mockInvestments);
          setFilteredInvestments(mockInvestments);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching investments:', error);
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  useEffect(() => {
    let filtered = investments;

    // تطبيق البحث
    if (searchTerm) {
      filtered = filtered.filter(investment => 
        investment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investment.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investment.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تطبيق فلتر الحالة
    if (filterStatus !== 'all') {
      filtered = filtered.filter(investment => investment.status === filterStatus);
    }

    // تطبيق فلتر الفئة
    if (filterCategory !== 'all') {
      filtered = filtered.filter(investment => investment.category === filterCategory);
    }

    setFilteredInvestments(filtered);
  }, [searchTerm, filterStatus, filterCategory, investments]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'قيد الانتظار';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const handleViewInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDeleteInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);
    setModalType('delete');
    setShowModal(true);
  };

  // دوال التعامل مع النموذج
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setInvestmentForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setInvestmentForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === 'locationImages') {
        setInvestmentForm(prev => ({
          ...prev,
          locationImages: Array.from(files)
        }));
      } else {
        setInvestmentForm(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
    }
  };

  const handleSubmitInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      // الانتقال للخطوة الثانية
      setFormStep(2);
    } else {
      // إنشاء استثمار جديد
      const newInvestment: Investment = {
        id: Date.now(), // استخدام timestamp كـ ID مؤقت
        companyName: investmentForm.companyName,
        branchName: investmentForm.branchName,
        location: `${investmentForm.branchCity}, ${investmentForm.companyLocation}`,
        investmentAmount: parseFloat(investmentForm.currentContractsSize.replace(/[^\d.]/g, '')) || 0,
        expectedReturn: parseFloat(investmentForm.expectedAnnualReturn.replace('%', '')) || 0,
        duration: parseInt(investmentForm.investmentDuration.replace(/[^\d]/g, '')) || 12,
        status: investmentForm.isActive ? 'active' : 'pending',
        createdDate: new Date().toISOString(),
        description: investmentForm.opportunityDescription || investmentForm.centerDescription,
        category: investmentForm.companyType,
        // حقول إضافية
        centerName: investmentForm.centerName,
        opportunityTitle: investmentForm.opportunityTitle,
        investmentPurpose: investmentForm.investmentPurpose,
        isActive: investmentForm.isActive,
        allowApplications: investmentForm.allowApplications
      };

      // إضافة الاستثمار الجديد إلى القائمة
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);

      console.log('بيانات الاستثمار الجديد:', investmentForm);
      console.log('الاستثمار المضاف:', newInvestment);

      alert('تم إضافة الاستثمار بنجاح!');
      setShowModal(false);
      setFormStep(1);

      // إعادة تعيين النموذج
      setInvestmentForm({
        companyName: '',
        companyType: '',
        companyLocation: '',
        branchName: '',
        branchCity: '',
        branchLatitude: '',
        branchLongitude: '',
        centerName: '',
        centerAddress: '',
        centerDescription: '',
        opportunityTitle: '',
        opportunityDescription: '',
        investmentPurpose: '',
        investmentDuration: '',
        expectedAnnualReturn: '',
        investmentConditions: '',
        currentContractsSize: '',
        employeesCount: '',
        employeesSpecialties: '',
        fixedAssets: '',
        equipment: '',
        financialObligations: '',
        lastBalance: '',
        locationImages: [],
        balanceFile: null,
        detailsPdf: null,
        isActive: true,
        allowApplications: true
      });
    }
  };

  const handleAddInvestment = () => {
    setSelectedInvestment(null);
    setModalType('add');
    setFormStep(1);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedInvestment) {
      setInvestments(investments.filter(investment => investment.id !== selectedInvestment.id));
      setShowModal(false);
      setSelectedInvestment(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
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
                إدارة الاستثمارات
              </h1>
              <p className="text-gray-600">
                إدارة الفرص الاستثمارية والمشاريع
              </p>
            </div>
            <button
              onClick={handleAddInvestment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus />
              إضافة استثمار جديد
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الاستثمارات</p>
                  <p className="text-2xl font-bold text-gray-900">{investments.length}</p>
                </div>
                <FaMoneyBillWave className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الاستثمارات النشطة</p>
                  <p className="text-2xl font-bold text-green-600">
                    {investments.filter(inv => inv.status === 'active').length}
                  </p>
                </div>
                <FaBuilding className="text-green-500 text-2xl" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">قيد الانتظار</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {investments.filter(inv => inv.status === 'pending').length}
                  </p>
                </div>
                <FaCalendarAlt className="text-yellow-500 text-2xl" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">مكتملة</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {investments.filter(inv => inv.status === 'completed').length}
                  </p>
                </div>
                <FaEye className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث بالشركة أو الفرع أو الموقع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الفئات</option>
                  <option value="تقنية">تقنية</option>
                  <option value="طاقة">طاقة</option>
                  <option value="تجارة إلكترونية">تجارة إلكترونية</option>
                  <option value="زراعة">زراعة</option>
                </select>
              </div>
            </div>
          </div>

          {/* Investments Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الشركة والفرع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العائد المتوقع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المدة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvestments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {investment.opportunityTitle || investment.companyName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {investment.companyName} - {investment.branchName}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1" />
                            {investment.location}
                          </div>
                          {investment.investmentPurpose && (
                            <div className="text-xs text-blue-600 mt-1">
                              {investment.investmentPurpose}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investment.investmentAmount.toLocaleString()} ريال
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investment.expectedReturn}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {investment.duration} شهر
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(investment.status)} mb-1`}>
                            {getStatusText(investment.status)}
                          </span>
                          {investment.allowApplications && (
                            <span className="text-xs text-green-600">
                              ✓ يقبل طلبات
                            </span>
                          )}
                          {!investment.allowApplications && (
                            <span className="text-xs text-gray-500">
                              ✗ لا يقبل طلبات
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewInvestment(investment)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="عرض"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEditInvestment(investment)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="تعديل"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteInvestment(investment)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="حذف"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              عرض <span className="font-medium">1</span> إلى <span className="font-medium">{filteredInvestments.length}</span> من <span className="font-medium">{investments.length}</span> نتيجة
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                السابق
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                التالي
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {modalType === 'view' && selectedInvestment && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">تفاصيل الاستثمار</h3>
                  <div className="space-y-4">
                    {/* معلومات أساسية */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">المعلومات الأساسية</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedInvestment.opportunityTitle && (
                          <div className="md:col-span-2"><strong>عنوان الفرصة:</strong> {selectedInvestment.opportunityTitle}</div>
                        )}
                        <div><strong>الشركة:</strong> {selectedInvestment.companyName}</div>
                        <div><strong>الفرع:</strong> {selectedInvestment.branchName}</div>
                        {selectedInvestment.centerName && (
                          <div><strong>المركز:</strong> {selectedInvestment.centerName}</div>
                        )}
                        <div><strong>الموقع:</strong> {selectedInvestment.location}</div>
                        <div><strong>الفئة:</strong> {selectedInvestment.category}</div>
                        <div><strong>تاريخ الإنشاء:</strong> {new Date(selectedInvestment.createdDate).toLocaleDateString('ar-SA')}</div>
                      </div>
                    </div>

                    {/* تفاصيل مالية */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">التفاصيل المالية</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>المبلغ:</strong> {selectedInvestment.investmentAmount.toLocaleString()} ريال</div>
                        <div><strong>العائد المتوقع:</strong> {selectedInvestment.expectedReturn}%</div>
                        <div><strong>المدة:</strong> {selectedInvestment.duration} شهر</div>
                        {selectedInvestment.investmentPurpose && (
                          <div><strong>الغرض:</strong> {selectedInvestment.investmentPurpose}</div>
                        )}
                      </div>
                    </div>

                    {/* الحالة والإعدادات */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">الحالة والإعدادات</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>الحالة:</strong>
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedInvestment.status)}`}>
                            {getStatusText(selectedInvestment.status)}
                          </span>
                        </div>
                        <div><strong>قبول الطلبات:</strong>
                          <span className={`ml-2 ${selectedInvestment.allowApplications ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedInvestment.allowApplications ? '✓ نعم' : '✗ لا'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* الوصف */}
                    {selectedInvestment.description && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">الوصف</h4>
                        <p className="text-gray-700">{selectedInvestment.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'add' && (
                <div className="max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-blue-600">إضافة فرصة استثمارية جديدة</h3>
                    <div className="text-sm text-gray-500">
                      الخطوة {formStep} من 2
                    </div>
                  </div>
                  <form onSubmit={handleSubmitInvestment} className="space-y-6">

                    {formStep === 1 && (
                      <>
                        {/* بيانات الشركة */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-semibold mb-4 text-gray-800">🏢 بيانات الشركة</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">اسم الشركة</label>
                              <input
                                type="text"
                                name="companyName"
                                value={investmentForm.companyName}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">نوع الشركة أو القطاع</label>
                              <input
                                type="text"
                                name="companyType"
                                value={investmentForm.companyType}
                                onChange={handleFormChange}
                                placeholder="مثال: الطرق والجسور"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1 text-gray-700">الموقع الجغرافي العام</label>
                              <input
                                type="text"
                                name="companyLocation"
                                value={investmentForm.companyLocation}
                                onChange={handleFormChange}
                                placeholder="المدينة - الدولة"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* بيانات الفرع */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-semibold mb-4 text-gray-800">🗺️ بيانات الفرع</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">اسم الفرع</label>
                              <input
                                type="text"
                                name="branchName"
                                value={investmentForm.branchName}
                                onChange={handleFormChange}
                                placeholder="مثال: فرع دمشق"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">المدينة</label>
                              <input
                                type="text"
                                name="branchCity"
                                value={investmentForm.branchCity}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">خط العرض (Latitude)</label>
                              <input
                                type="text"
                                name="branchLatitude"
                                value={investmentForm.branchLatitude}
                                onChange={handleFormChange}
                                placeholder="33.5138"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">خط الطول (Longitude)</label>
                              <input
                                type="text"
                                name="branchLongitude"
                                value={investmentForm.branchLongitude}
                                onChange={handleFormChange}
                                placeholder="36.2765"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>

                        {/* بيانات المركز */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-semibold mb-4 text-gray-800">🧭 بيانات المركز</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">اسم المركز</label>
                              <input
                                type="text"
                                name="centerName"
                                value={investmentForm.centerName}
                                onChange={handleFormChange}
                                placeholder="مثال: مركز المطار"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">العنوان التفصيلي</label>
                              <input
                                type="text"
                                name="centerAddress"
                                value={investmentForm.centerAddress}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">صورة للموقع أو المبنى (اختياري)</label>
                              <input
                                type="file"
                                name="centerImage"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">وصف مختصر للمركز</label>
                              <textarea
                                name="centerDescription"
                                value={investmentForm.centerDescription}
                                onChange={handleFormChange}
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {formStep === 2 && (
                      <>
                        {/* تفاصيل الفرصة الاستثمارية */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-semibold mb-4 text-gray-800">📊 تفاصيل الفرصة الاستثمارية</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1 text-gray-700">عنوان الفرصة</label>
                              <input
                                type="text"
                                name="opportunityTitle"
                                value={investmentForm.opportunityTitle}
                                onChange={handleFormChange}
                                placeholder="مثال: استثمار في مركز المطار – فرع دمشق"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1 text-gray-700">وصف تفصيلي للفرصة</label>
                              <textarea
                                name="opportunityDescription"
                                value={investmentForm.opportunityDescription}
                                onChange={handleFormChange}
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">الغاية من الاستثمار</label>
                              <input
                                type="text"
                                name="investmentPurpose"
                                value={investmentForm.investmentPurpose}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">مدة الاستثمار</label>
                              <input
                                type="text"
                                name="investmentDuration"
                                value={investmentForm.investmentDuration}
                                onChange={handleFormChange}
                                placeholder="مثال: 5 سنوات"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">العائد السنوي المتوقع</label>
                              <input
                                type="text"
                                name="expectedAnnualReturn"
                                value={investmentForm.expectedAnnualReturn}
                                onChange={handleFormChange}
                                placeholder="مثال: 15%"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-gray-700">حجم العقود الحالية</label>
                              <input
                                type="text"
                                name="currentContractsSize"
                                value={investmentForm.currentContractsSize}
                                onChange={handleFormChange}
                                placeholder="مثال: 2 مليون دولار"
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1 text-gray-700">شروط الاستثمار</label>
                              <textarea
                                name="investmentConditions"
                                value={investmentForm.investmentConditions}
                                onChange={handleFormChange}
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-md text-right"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* التحكم */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-semibold mb-4 text-gray-800">⚙️ التحكم</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                name="isActive"
                                checked={investmentForm.isActive}
                                onChange={handleFormChange}
                                className="ml-2"
                              />
                              <label className="text-sm font-medium text-gray-700">الحالة: نشطة ✅</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                name="allowApplications"
                                checked={investmentForm.allowApplications}
                                onChange={handleFormChange}
                                className="ml-2"
                              />
                              <label className="text-sm font-medium text-gray-700">السماح بتقديم طلبات</label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex justify-end space-x-reverse space-x-2">
                      {formStep === 2 && (
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          السابق
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {formStep === 1 ? 'التالي' : 'حفظ الاستثمار'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {modalType === 'delete' && selectedInvestment && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">تأكيد الحذف</h3>
                  <p className="mb-4">هل أنت متأكد من حذف الاستثمار "{selectedInvestment.companyName} - {selectedInvestment.branchName}"؟</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implement delete functionality
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}

              {modalType !== 'delete' && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    إغلاق
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
