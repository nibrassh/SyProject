import express from 'express'
import { createUser, deleteUser, getUsers, signIn, toggleUserAdmin } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verfiToken.js';

const authRoute= express.Router()

authRoute.post('/signin',signIn)

authRoute.post('/create-user',verifyToken,createUser)

authRoute.delete('/:id',verifyToken,deleteUser)

authRoute.put('/toggle-admin/:id',verifyToken,toggleUserAdmin)

authRoute.get('/users',verifyToken,getUsers)


authRoute.get('/check-admin', verifyToken, (req, res) => {
  try {
   console.log("object")
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin privileges required",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Admin access verified",
      user: {
        id: req.user.id,
        isAdmin: true
      }
    });

  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during admin verification",
      error: error 
       });
  }
});


export default authRoute;