import express from "express";
import {
  createCancha,
  deleteCancha,
  getCanchaById,
  getCanchas,
  updateCancha,
} from "../controllers/canchaController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { checkRole } from "../Middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getCanchas);
router.get("/:id", getCanchaById);

router.post("/", verifyToken, checkRole("admin", "sysadmin"), createCancha);
router.put("/:id", verifyToken, checkRole("admin", "sysadmin"), updateCancha);
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin", "sysadmin"),
  deleteCancha
);

export default router;
