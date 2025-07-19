import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import axios from 'axios';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
   const response = intlMiddleware(request);

  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/admindashboard')) {
    const token = request.cookies.get('token')?.value;
       console.log(token)
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      let adminCheck;

      // محاولة استخدام API الخارجي أولاً
      try {
        adminCheck = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/v1/check-admin`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Cookie: `token=${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (apiError) {
        console.log("External API failed, using local check...");

        // في حالة فشل API الخارجي، استخدم التحقق المحلي
        adminCheck = await axios.get(
          new URL('/api/check-admin', request.url).toString()
        );
      }

      if (!adminCheck.data.success) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (!adminCheck.data?.success || !adminCheck.data?.user?.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
        console.log("Admin check failed:", error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/admin/:path*',
    '/admindashboard/:path*'
  ]
};