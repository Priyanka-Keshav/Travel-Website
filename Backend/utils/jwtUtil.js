const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwtConfig");

// Generate Access Token (Valid for 1 hour)
const generateToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

// Generate Refresh Token (Valid for 7 days)
const generateRefreshToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

// Verify Token with Error Handling
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Return null if token is invalid
  }
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
