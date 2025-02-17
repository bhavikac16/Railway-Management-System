const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
};

const isAdmin = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "Unauthorized Admin" });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
