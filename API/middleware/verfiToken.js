import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    console.log(req.headers)
     const token = req.cookies?.token 
    console.log(token)
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Authorization token is required"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    if (!decoded.id && !decoded.isAdmin) {
      return res.status(403).json({
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
   
     
    return res.status(401).json({
      success: false,
      message:"Authentication failed",
      error: error
    });
  }
};