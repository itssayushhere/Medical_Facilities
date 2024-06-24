import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// Authentication Middleware
export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists and is a Bearer token
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID and role to the request object
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Authorization Middleware
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  try {
    // Check both User and Doctor collections for the user
    const user = await User.findById(userId) || await Doctor.findById(userId);

    // If user is not found or role is not authorized
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
