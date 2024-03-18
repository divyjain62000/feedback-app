const jwt = require('jsonwebtoken');
const User = require('@models/user/userModel');
const { roles } = require('@constants/role');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log("Verying token");
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token.replace('Bearer ',''), process.env.JWT_SECRET_KEY, async (err, decoded) => {

    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  });
};

exports.authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
  };
}