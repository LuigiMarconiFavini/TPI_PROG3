import express from "express"; // 🔹 Esto faltaba

import { Router } from "express";
import {
  createCancha,
  deleteCancha,
  getCanchaById,
  getCanchas,
  updateCancha,
} from "../controllers/canchaController.js";

const router = express.Router();

router.get("/", getCanchas);
router.get("/:id", getCanchaById);
router.post("/", createCancha);
router.put("/:id", updateCancha);
router.delete("/:id", deleteCancha);

export default router;
