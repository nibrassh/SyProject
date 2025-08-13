import express from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  toggleUserAdmin,
  signIn,
  signOut,
  refreshToken
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/verfiToken.js';
import { isAdmin } from '../middleware/isAdmin.js';

const authRoute = express.Router();

authRoute.post('/signin', signIn);
authRoute.post("/refresh-token", refreshToken);

authRoute.use(verifyToken, isAdmin);

authRoute.post('/signout', signOut);
authRoute.post('/create-user', createUser);
authRoute.delete('/:id', deleteUser);
authRoute.put('/toggle-admin/:id', toggleUserAdmin);
authRoute.get('/users', getUsers);


authRoute.get('/check-admin', (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin access verified",
    user: {
      id: req.user.id,
      isAdmin: true
    }
  });
});

export default authRoute;
