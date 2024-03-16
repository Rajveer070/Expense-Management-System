import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Get token from request header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user information in req.user
    req.user = decoded;

    next(); // Call next middleware
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
