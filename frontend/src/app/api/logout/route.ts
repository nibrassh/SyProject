import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    // محاولة استدعاء API الخارجي للـ logout
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/v1/signout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (apiError) {
      console.log("External API logout failed, proceeding with local logout...");
    }

    // إنشاء response وحذف الـ cookies
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح"
    });

    // حذف جميع الـ cookies المتعلقة بالمصادقة
    response.cookies.delete('token');
    response.cookies.delete('accessToken');
    response.cookies.delete('isAdmin');

    // إضافة headers لمنع الـ caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    
    // حتى في حالة الخطأ، نحذف الـ cookies
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح"
    });

    response.cookies.delete('token');
    response.cookies.delete('accessToken');
    response.cookies.delete('isAdmin');

    return response;
  }
}
