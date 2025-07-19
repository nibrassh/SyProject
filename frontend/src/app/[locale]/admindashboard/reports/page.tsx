"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaDownload, 
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaBuilding,
  FaFileAlt
} from 'react-icons/fa';

interface ReportData {
  userGrowth: number[];
  investmentTrends: number[];
  monthlyRevenue: number[];
  requestStatus: { pending: number; approved: number; rejected: number };
  topCompanies: { name: string; investments: number }[];
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب بيانات التقارير
    const fetchReportData = async () => {
      try {
        setTimeout(() => {
          setReportData({
            userGrowth: [10, 15, 12, 18, 25, 30, 28, 35, 40, 38, 45, 50],
            investmentTrends: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
            monthlyRevenue: [50000, 65000, 58000, 72000, 85000, 95000, 88000, 105000, 120000, 115000, 135000, 150000],
            requestStatus: { pending: 12, approved: 45, rejected: 8 },
            topCompanies: [
              { name: "شركة التقنية المتقدمة", investments: 15 },
              { name: "مجموعة الاستثمار الذكي", investments: 12 },
              { name: "شركة الابتكار الرقمي", investments: 10 },
              { name: "مؤسسة النمو المستدام", investments: 8 },
              { name: "شركة المستقبل التقني", investments: 6 }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching report data:', error);
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedPeriod]);

  const summaryCards = [
    {
      title: "إجمالي المستخدمين",
      value: "156",
      change: "+12%",
      icon: FaUsers,
      color: "bg-blue-500"
    },
    {
      title: "الاستثمارات النشطة",
      value: "42",
      change: "+8%",
      icon: FaMoneyBillWave,
      color: "bg-green-500"
    },
    {
      title: "الشركات المسجلة",
      value: "28",
      change: "+15%",
      icon: FaBuilding,
      color: "bg-purple-500"
    },
    {
      title: "الطلبات المعالجة",
      value: "65",
      change: "+22%",
      icon: FaFileAlt,
      color: "bg-orange-500"
    }
  ];

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
                التقارير والإحصائيات
              </h1>
              <p className="text-gray-600">
                تقارير شاملة عن أداء المنصة والإحصائيات المفصلة
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaDownload />
                تصدير التقرير
              </button>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">الأسبوع الماضي</option>
                <option value="month">الشهر الماضي</option>
                <option value="quarter">الربع الماضي</option>
                <option value="year">السنة الماضية</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {card.change} من الشهر الماضي
                    </p>
                  </div>
                  <div className={`${card.color} p-3 rounded-full`}>
                    <card.icon className="text-white text-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">نمو المستخدمين</h3>
                <FaChartLine className="text-blue-500" />
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {reportData?.userGrowth.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-blue-500 rounded-t w-8"
                      style={{ height: `${(value / 50) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Trends */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">اتجاهات الاستثمار</h3>
                <FaChartBar className="text-green-500" />
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {reportData?.investmentTrends.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-green-500 rounded-t w-8"
                      style={{ height: `${(value / 42) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Status & Top Companies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">حالة الطلبات</h3>
                <FaChartPie className="text-purple-500" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">قيد الانتظار</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${(reportData?.requestStatus.pending || 0) / 65 * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{reportData?.requestStatus.pending}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">موافق عليها</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(reportData?.requestStatus.approved || 0) / 65 * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{reportData?.requestStatus.approved}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">مرفوضة</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(reportData?.requestStatus.rejected || 0) / 65 * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{reportData?.requestStatus.rejected}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Companies */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">أفضل الشركات</h3>
              <div className="space-y-4">
                {reportData?.topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-900">{company.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {company.investments} استثمار
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
