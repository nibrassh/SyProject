import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // للاختبار، نعتبر أن المستخدم مدير دائماً
    // في التطبيق الحقيقي، يجب التحقق من التوكن والصلاحيات

    return NextResponse.json(
      {
        success: true,
        message: "Admin access verified",
        user: {
          id: "admin123",
          isAdmin: true
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during admin verification",
        error: error
      },
      { status: 500 }
    );
  }
}

  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during admin verification",
        error: error
      },
      { status: 500 }
    );
  }
}
