import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenValid = (token) => {
  if (!token || typeof token !== "string") return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  if (!decoded.exp) return true;

  const currentTime = Date.now() / 1000;
  return currentTime < decoded.exp;
};
