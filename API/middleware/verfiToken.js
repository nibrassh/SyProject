import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
       let accessToken = req.cookies?.token;

    if (!accessToken && req.headers.authorization?.startsWith('Bearer ')) {
      accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin || false
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
