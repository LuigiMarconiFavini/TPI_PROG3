import express from "express";
import {
  getAllUsers,
  getMyProfile,
  getUserById,
  updateUser,
} from "../controllers/usersController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { checkRole } from "../Middleware/roleMiddleware.js";

const router = express.Router();


router.get("/me", verifyToken, getMyProfile);
router.put("/:id",  updateUser);
router.get("/getAllUsers", verifyToken, checkRole('sysadmin'), getAllUsers);
router.get("/:id", getUserById);

export default router;
