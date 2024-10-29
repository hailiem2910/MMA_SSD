// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   // Log the Authorization header to check if the token is passed
//   console.log("Authorization header:", req.headers["authorization"]);
//   console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is loaded

//   const token = req.headers["authorization"];
//   if (!token)
//     return res.status(403).send("A token is required for authentication");

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Log decoded token
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error); // Log any token verification errors
//     return res.status(401).send("Invalid Token");
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Log the Authorization header to check if the token is passed
  console.log("Authorization header:", req.headers["authorization"]);

  // Check if JWT_SECRET is loaded (only for debugging in development)
  if (process.env.NODE_ENV !== "production") {
    console.log("JWT_SECRET is loaded");
  }

  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    // Verify token and extract user ID
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log decoded token

    // Retrieve user from database
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(404).send("User not found");
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log any token verification errors
    return res.status(401).send("Invalid Token");
  }
};

module.exports = authMiddleware;
