import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

async function createAdminUser() {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    // التحقق من وجود المستخدم admin
    const existingAdmin = await User.findOne({ email: 'admin@test.com' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      
      // تحديث كلمة المرور والصلاحيات إذا لزم الأمر
      existingAdmin.password = 'admin1234';
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('✅ Admin user updated successfully');
    } else {
      // إنشاء مستخدم admin جديد
      const adminUser = new User({
        name: 'Administrator',
        email: 'admin@test.com',
        password: 'admin1234',
        isAdmin: true
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
    }

    console.log('Admin user details:');
    console.log('Email: admin@test.com');
    console.log('Password: admin1234');
    console.log('Is Admin: true');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  }
}

createAdminUser();
