import { NextResponse, NextRequest } from 'next/server'
import { adminUser } from '@/data/fakeData'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "The fields are required" },
        { status: 400 }
      )
    }

    // Check if user exists in database by email
    // Compare the password if equal
    if (email !== adminUser.email || password !== adminUser.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate access token
    const accessToken = "Bearer the user is admin"

    return NextResponse.json(
      {
        success: true,
        accessToken,
        isAdmin: true 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Admin authentication error:", error)
    return NextResponse.json(
      { 
        message: "There was an error processing your request",
        error: error 
      },
      { status: 500 }
    )
  }
}