"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaEye,
  FaCheck,
  FaTimes,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaClock,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

interface InvestmentRequest {
  id: string | number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  investmentTitle: string;
  companyName: string;
  requestedAmount: number;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  notes?: string;
  attachments?: string[];
}

export default function InvestmentRequestsPage() {
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<InvestmentRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<InvestmentRequest | null>(null);
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject'>('view');

  useEffect(() => {
    // محاكاة جلب بيانات الطلبات
    const fetchRequests = async () => {
      try {
        setTimeout(() => {
          // بيانات وهمية للاختبار - ستكون فارغة مبدئياً
          const mockRequests: InvestmentRequest[] = [];
          
          setRequests(mockRequests);
          setFilteredRequests(mockRequests);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    let filtered = requests;

    // تطبيق البحث
    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.investmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تطبيق فلتر الحالة
    if (filterStatus !== 'all') {
      filtered = filtered.filter(request => request.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, filterStatus, requests]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'approved': return 'موافق عليه';
      case 'rejected': return 'مرفوض';
      case 'under_review': return 'قيد المراجعة';
      default: return 'غير محدد';
    }
  };

  const handleViewRequest = (request: InvestmentRequest) => {
    setSelectedRequest(request);
    setModalType('view');
    setShowModal(true);
  };

  const handleApproveRequest = (request: InvestmentRequest) => {
    setSelectedRequest(request);
    setModalType('approve');
    setShowModal(true);
  };

  const handleRejectRequest = (request: InvestmentRequest) => {
    setSelectedRequest(request);
    setModalType('reject');
    setShowModal(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الطلبات...</p>
          </div>
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
                طلبات الاستثمارات الواردة
              </h1>
              <p className="text-gray-600">
                إدارة ومراجعة طلبات الاستثمار المقدمة من المستثمرين
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث بالاسم، البريد الإلكتروني، أو عنوان الاستثمار..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">في الانتظار</option>
                  <option value="under_review">قيد المراجعة</option>
                  <option value="approved">موافق عليه</option>
                  <option value="rejected">مرفوض</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <FaBuilding className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد طلبات استثمار حالياً
                </h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'لم يتم العثور على طلبات تطابق معايير البحث المحددة'
                    : 'لم يتم تقديم أي طلبات استثمار بعد'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        مقدم الطلب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاستثمار المطلوب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المبلغ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ التقديم
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
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {request.applicantName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaEnvelope className="ml-1" />
                              {request.applicantEmail}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaPhone className="ml-1" />
                              {request.applicantPhone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {request.investmentTitle}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.companyName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.requestedAmount.toLocaleString()} ريال
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(request.submissionDate).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-reverse space-x-2">
                            <button
                              onClick={() => handleViewRequest(request)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="عرض التفاصيل"
                            >
                              <FaEye />
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(request)}
                                  className="text-green-600 hover:text-green-900 p-1"
                                  title="موافقة"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleRejectRequest(request)}
                                  className="text-red-600 hover:text-red-900 p-1"
                                  title="رفض"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal - سيتم إضافة المحتوى لاحقاً */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">تفاصيل الطلب</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="text-center py-8">
                <p className="text-gray-500">سيتم إضافة محتوى المودال لاحقاً</p>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
