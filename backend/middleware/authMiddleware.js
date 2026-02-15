import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Invalid or missing Authorization header");
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("❌ No token found after Bearer prefix");
      return res.status(401).json({ message: "No token provided" });
    }

    // console.log("👉 Verifying token...");
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("✅ Token verified for:", decoded.email);
    // req.admin = decoded;
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.name, error.message);
    const message = error.name === "TokenExpiredError" ? "Token expired" : "Unauthorized";
    return res.status(401).json({ message });
  }
};
