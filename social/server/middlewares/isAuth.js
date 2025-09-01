import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Ensure your token was signed with { userId }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default isAuth;