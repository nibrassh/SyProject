import { NextRequest, NextResponse } from 'next/server';

let mockUsers = [
  {
    _id: '1',
    name: 'أحمد محمد علي',
    email: 'ahmed@syproject.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    lastLogin: '2024-01-20T14:30:00.000Z',
    investmentCount: 3,
    phone: '+966501234567'
  },
  {
    _id: '2',
    name: 'فاطمة علي حسن',
    email: 'fatima@syproject.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-01-10T09:15:00.000Z',
    lastLogin: '2024-01-19T16:45:00.000Z',
    investmentCount: 5,
    phone: '+966507654321'
  },
  {
    _id: '3',
    name: 'محمد حسن أحمد',
    email: 'mohammed@syproject.com',
    role: 'admin',
    isActive: true,
    createdAt: '2023-12-01T08:00:00.000Z',
    lastLogin: '2024-01-20T18:20:00.000Z',
    investmentCount: 0,
    phone: '+966509876543'
  },
  {
    _id: '4',
    name: 'سارة أحمد محمد',
    email: 'sara@syproject.com',
    role: 'user',
    isActive: false,
    createdAt: '2024-01-05T11:30:00.000Z',
    lastLogin: '2024-01-15T13:15:00.000Z',
    investmentCount: 1,
    phone: '+966502468135'
  },
  {
    _id: '5',
    name: 'عبدالله محمود خالد',
    email: 'abdullah@syproject.com',
    role: 'user',
    isActive: true,
    createdAt: '2023-12-20T15:45:00.000Z',
    lastLogin: '2024-01-18T12:00:00.000Z',
    investmentCount: 7,
    phone: '+966508642097'
  }
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const formattedUsers = mockUsers.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === 'admin',
      isActive: user.isActive,
      joinDate: user.createdAt,
      lastLogin: user.lastLogin,
      investmentCount: user.investmentCount,
      phone: user.phone,
      profileImage: null
    }));

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      total: formattedUsers.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'فشل في جلب بيانات المستخدمين'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    const userIndex = mockUsers.findIndex(user => user._id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'المستخدم غير موجود' },
        { status: 404 }
      );
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates,
      lastLogin: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات المستخدم بنجاح'
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'فشل في تحديث بيانات المستخدم'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    const userIndex = mockUsers.findIndex(user => user._id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'المستخدم غير موجود' },
        { status: 404 }
      );
    }

    mockUsers.splice(userIndex, 1);

    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'فشل في حذف المستخدم'
      },
      { status: 500 }
    );
  }
}
