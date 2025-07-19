import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// مستخدم admin مؤقت للاختبار
const tempAdminUser = {
  _id: "admin123",
  email: "admin@test.com",
  password: "admin1234",
  isAdmin: true
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required",
      });
    }

    // التحقق من المستخدم المؤقت أولاً
    if (email === tempAdminUser.email && password === tempAdminUser.password) {
      const user = tempAdminUser;

      if (!user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Account is deactivated",
        });
      }
    } else {
      // محاولة البحث في قاعدة البيانات
      try {
        const user = await User.findOne({ email , password });
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        if (!user.isAdmin) {
          return res.status(403).json({
            success: false,
            message: "Account is deactivated",
          });
        }
      } catch (dbError) {
        // في حالة عدم توفر قاعدة البيانات، استخدم المستخدم المؤقت
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }

    // استخدام المستخدم المؤقت أو من قاعدة البيانات
    const currentUser = (email === tempAdminUser.email && password === tempAdminUser.password)
      ? tempAdminUser
      : await User.findOne({ email, password });

    const token = jwt.sign(
      {
        id: currentUser._id,
        isAdmin: currentUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // حفظ المستخدم فقط إذا كان من قاعدة البيانات
    if (currentUser !== tempAdminUser) {
      await currentUser.save();
    }

    const userData = {
      _id: currentUser._id,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
    };

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Sign in successful",
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
};
