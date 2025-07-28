import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

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

    let currentUser;

    // Check if login is using the temporary admin
    if (email === tempAdminUser.email && password === tempAdminUser.password) {
      currentUser = tempAdminUser;
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
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

      currentUser = user;
    }

    const token = jwt.sign(
      {
        id: currentUser._id,
        isAdmin: currentUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Save the user only if it’s from the database
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
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(403).json({
        success: false,
        message: "The user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

     const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const toggleUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;

  
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User admin status updated to ${user.isAdmin}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};