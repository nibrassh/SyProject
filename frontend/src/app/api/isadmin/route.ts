// app/api/isadmin/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { adminUser } from '../../../../fakeData/data'

export async function GET(request: NextRequest) {
  try {  
      return NextResponse.json(
      { isAdmin: true },
      { status: 200 }
    )

    const accessToken = request.cookies.get('accessToken')?.value
    const isAdminCookie = request.cookies.get('isAdmin')?.value
     console.log(isAdminCookie)

    if (!accessToken || accessToken !== "Bearer the user is admin") {
      return NextResponse.json(
        { isAdmin: false, message: "Invalid access token" },
        { status: 401 }
      )
    }

    // 3. Check admin status from database (using mock data here)
    // In real app, you would check against your database
    const isAdminFromDB = adminUser.isAdmin
    
    // 4. Verify cookie matches database status
    if (isAdminCookie !== String(isAdminFromDB)) {
      return NextResponse.json(
        { isAdmin: false, message: "Cookie tampering detected" },
        { status: 403 }
      )
    }


    return NextResponse.json(
      { isAdmin: isAdminFromDB },
      { status: 200 }
    )

  } catch (error) {
    console.error("Admin check error:", error)
    return NextResponse.json(
      { isAdmin: false, message: "Server error" },
      { status: 500 }
    )
  }
}