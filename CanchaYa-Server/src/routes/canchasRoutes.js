import express from "express";
import {
  createCancha,
  deleteCancha,
  getAllCanchas,
  getCanchaById,
  getCanchas,
  updateCancha,
} from "../controllers/canchaController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { checkRole } from "../Middleware/roleMiddleware.js";

const router = express.Router();

router.get("/getAll", verifyToken, checkRole("sysadmin"), getAllCanchas);
router.get("/", getCanchas);
router.get("/:id", getCanchaById);

router.post("/", verifyToken, checkRole("admin", "sysadmin"), createCancha);
router.put("/:id", verifyToken, checkRole("admin", "sysadmin"), updateCancha);
router.delete("/:id", verifyToken, checkRole("sysadmin"), deleteCancha);

export default router;
