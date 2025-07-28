import { useRouter } from 'next/navigation';

// دالة تسجيل الخروج
export const logout = async () => {
  try {
    // استدعاء API للـ logout
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      // حذف أي بيانات محلية إضافية
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        sessionStorage.clear();
      }

      // إعادة تحميل الصفحة لضمان حذف جميع البيانات
      window.location.href = '/signin';
      
      return { success: true };
    } else {
      throw new Error(data.message || 'فشل في تسجيل الخروج');
    }
  } catch (error) {
    console.error('Logout error:', error);
    
    // حتى في حالة الخطأ، نحذف البيانات المحلية ونوجه للصفحة الرئيسية
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      sessionStorage.clear();
      window.location.href = '/signin';
    }
    
    return { success: false, error: error };
  }
};

// Hook للتعامل مع تسجيل الخروج
export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // التوجيه لصفحة تسجيل الدخول
      router.push('/signin');
    }
  };

  return handleLogout;
};
