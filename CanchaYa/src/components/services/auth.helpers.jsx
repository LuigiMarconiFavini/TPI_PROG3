import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);

    const currenTime = Date.now() / 1000;

    return currenTime < decodedToken.exp;
  } catch (error) {
    console.error("Error decodind token:", error);
    return false;
  }
};
