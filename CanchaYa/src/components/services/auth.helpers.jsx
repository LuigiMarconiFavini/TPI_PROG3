import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenValid = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return false;

  const currenTime = Date.now() / 1000;
  return currenTime < decoded.exp;
};
