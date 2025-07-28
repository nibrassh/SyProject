"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import Link from 'next/link';
import {
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaUserCog,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaClipboardList
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalInvestments: number;
  totalRequests: number;
  totalCompanies: number;
  monthlyGrowth: number;
  activeInvestments: number;
  investmentRequests: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalInvestments: 0,
    totalRequests: 0,
    totalCompanies: 0,
    monthlyGrowth: 0,
    activeInvestments: 0,
    investmentRequests: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات من API
    const fetchStats = async () => {
      try {
        // هنا يمكن استدعاء API حقيقي
        setTimeout(() => {
          setStats({
            totalUsers: 156,
            totalInvestments: 24,
            totalRequests: 12,
            totalCompanies: 8,
            monthlyGrowth: 15.2,
            activeInvestments: 18,
            investmentRequests: 5
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "الاستثمارات النشطة",
      value: stats.activeInvestments,
      icon: FaMoneyBillWave,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "الطلبات المعلقة",
      value: stats.totalRequests,
      icon: FaFileAlt,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      change: "-3%",
      changeType: "decrease"
    },
    {
      title: "إجمالي الشركات",
      value: stats.totalCompanies,
      icon: FaBuilding,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+5%",
      changeType: "increase"
    },
    {
      title: "طلبات الاستثمار",
      value: stats.investmentRequests,
      icon: FaClipboardList,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      change: "+2%",
      changeType: "increase"
    }
  ];

  const quickActions = [
    {
      title: "إدارة الشركات",
      description: "عرض وإدارة الشركات المسجلة",
      icon: FaBuilding,
      href: "/admindashboard/companies",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "إدارة الاستثمارات",
      description: "إضافة وتعديل الفرص الاستثمارية",
      icon: FaMoneyBillWave,
      href: "/admindashboard/investments",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "طلبات الاستثمارات",
      description: "مراجعة طلبات الاستثمار الواردة",
      icon: FaClipboardList,
      href: "/admindashboard/investment-requests",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "إدارة الحسابات",
      description: "عرض وإدارة حسابات المستخدمين",
      icon: FaUserCog,
      href: "/admindashboard/accounts",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "التقارير والإحصائيات",
      description: "عرض التقارير المفصلة والإحصائيات",
      icon: FaChartLine,
      href: "/admindashboard/reports",
      color: "bg-orange-500 hover:bg-orange-600"
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
          <div className="mb-8 text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              لوحة التحكم الإدارية
            </h1>
            <p className="text-gray-600">
              مرحباً بك في لوحة التحكم، يمكنك من هنا إدارة جميع جوانب المنصة
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div key={index} className={`${card.bgColor} rounded-lg p-6 shadow-sm border`}>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <div className="flex items-center mt-2 justify-end">
                      <span className={`text-sm ml-1 ${
                        card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {card.change}
                      </span>
                      {card.changeType === 'increase' ? (
                        <FaArrowUp className="text-green-500 text-sm" />
                      ) : (
                        <FaArrowDown className="text-red-500 text-sm" />
                      )}
                    </div>
                  </div>
                  <div className={`${card.color} p-3 rounded-full`}>
                    <card.icon className="text-white text-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">الإجراءات السريعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer text-right">
                    <div className={`${action.color} p-3 rounded-full w-fit mb-4 mr-auto`}>
                      <action.icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">النشاط الأخير</h2>
            <div className="space-y-4">
              {[
                { action: "تم إضافة مستخدم جديد", time: "منذ 5 دقائق", type: "user" },
                { action: "تم تحديث فرصة استثمارية", time: "منذ 15 دقيقة", type: "investment" },
                { action: "طلب جديد في الانتظار", time: "منذ 30 دقيقة", type: "request" },
                { action: "تم إضافة شركة جديدة", time: "منذ ساعة", type: "company" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                  <div className="flex items-center">
                    <span className="text-gray-900 ml-3">{activity.action}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'investment' ? 'bg-green-500' :
                      activity.type === 'request' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
