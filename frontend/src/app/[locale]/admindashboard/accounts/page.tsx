"use client";
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaEye,
  FaUserCheck,
  FaUserTimes,
  FaFilter
} from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  joinDate: string;
  lastLogin: string;
  investmentCount: number;
  phone?: string;
  profileImage?: string;
}

export default function AccountsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete'>('view');

  useEffect(() => {
    // جلب بيانات المستخدمين من قاعدة البيانات
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/accounts');
        const result = await response.json();

        if (result.success) {
          setUsers(result.data);
          setFilteredUsers(result.data);
        } else {
          console.error('Error fetching users:', result.error);
          // في حالة الخطأ، عرض قائمة فارغة
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // في حالة الخطأ، عرض قائمة فارغة
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // تطبيق البحث
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تطبيق الفلتر
    if (filterStatus !== 'all') {
      if (filterStatus === 'active') {
        filtered = filtered.filter(user => user.isActive);
      } else if (filterStatus === 'inactive') {
        filtered = filtered.filter(user => !user.isActive);
      } else if (filterStatus === 'admin') {
        filtered = filtered.filter(user => user.isAdmin);
      }
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterStatus, users]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setModalType('delete');
    setShowModal(true);
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const response = await fetch('/api/admin/accounts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          updates: {
            isActive: !user.isActive
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        // تحديث الحالة محلياً
        setUsers(users.map(u =>
          u.id === userId ? { ...u, isActive: !u.isActive } : u
        ));
      } else {
        alert('فشل في تحديث حالة المستخدم: ' + result.error);
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('حدث خطأ أثناء تحديث حالة المستخدم');
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/admin/accounts?userId=${selectedUser.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // إزالة المستخدم من القائمة محلياً
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setShowModal(false);
        setSelectedUser(null);
        alert('تم حذف المستخدم بنجاح');
      } else {
        alert('فشل في حذف المستخدم: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('حدث خطأ أثناء حذف المستخدم');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل بيانات المستخدمين...</p>
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
                إدارة الحسابات
              </h1>
              <p className="text-gray-600">
                إدارة حسابات المستخدمين والصلاحيات
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaPlus />
              إضافة مستخدم جديد
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع المستخدمين</option>
                  <option value="active">المستخدمين النشطين</option>
                  <option value="inactive">المستخدمين غير النشطين</option>
                  <option value="admin">المديرين</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد حسابات مستخدمين
                </h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all'
                    ? 'لم يتم العثور على مستخدمين يطابقون معايير البحث المحددة'
                    : 'لم يتم تسجيل أي مستخدمين في النظام بعد'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المستخدم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ الانضمام
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        آخر دخول
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاستثمارات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {user.name.charAt(0)}
                            </div>
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                              {user.isAdmin && (
                                <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  مدير
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.joinDate ? new Date(user.joinDate).toLocaleDateString('ar-SA') : 'غير محدد'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : 'لم يسجل دخول'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.investmentCount || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="عرض"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="تعديل"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`p-1 ${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                            title={user.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
                          >
                            {user.isActive ? <FaUserTimes /> : <FaUserCheck />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
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
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              عرض <span className="font-medium">1</span> إلى <span className="font-medium">{filteredUsers.length}</span> من <span className="font-medium">{users.length}</span> نتيجة
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
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              {modalType === 'view' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">تفاصيل المستخدم</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">المعلومات الأساسية</h4>
                      <div className="space-y-2">
                        <div><strong>الاسم:</strong> {selectedUser.name || 'غير محدد'}</div>
                        <div><strong>البريد الإلكتروني:</strong> {selectedUser.email}</div>
                        {selectedUser.phone && (
                          <div><strong>رقم الهاتف:</strong> {selectedUser.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">حالة الحساب</h4>
                      <div className="space-y-2">
                        <div><strong>الحالة:</strong>
                          <span className={`mr-2 px-2 py-1 rounded text-xs ${selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedUser.isActive ? 'نشط' : 'غير نشط'}
                          </span>
                        </div>
                        <div><strong>نوع الحساب:</strong>
                          <span className={`mr-2 px-2 py-1 rounded text-xs ${selectedUser.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            {selectedUser.isAdmin ? 'مدير' : 'مستخدم عادي'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">إحصائيات</h4>
                      <div className="space-y-2">
                        <div><strong>تاريخ الانضمام:</strong> {selectedUser.joinDate ? new Date(selectedUser.joinDate).toLocaleDateString('ar-SA') : 'غير محدد'}</div>
                        <div><strong>آخر دخول:</strong> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString('ar-SA') : 'لم يسجل دخول'}</div>
                        <div><strong>عدد الاستثمارات:</strong> {selectedUser.investmentCount || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {modalType === 'delete' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">تأكيد الحذف</h3>
                  <p className="mb-4">هل أنت متأكد من حذف المستخدم "{selectedUser.name}"؟</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={confirmDelete}
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
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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
