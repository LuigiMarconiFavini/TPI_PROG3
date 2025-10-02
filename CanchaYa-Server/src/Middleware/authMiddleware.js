import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No posee autorizacion requerida" });
  }
  try {
    const payload = jwt.verify(token, "c4nch4Y4");
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "No posee permisos correctos" });
  }
};
