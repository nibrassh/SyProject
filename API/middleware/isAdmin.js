import User from '../models/userModel.js'

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('isAdmin');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admins only.'
      });
    }

    next();
  } catch (error) {
    console.error('isAdmin middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
