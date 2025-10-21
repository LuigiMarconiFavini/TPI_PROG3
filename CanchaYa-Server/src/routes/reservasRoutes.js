import express from "express";
import {
  crearReserva,
  editarReserva,
  eliminarReserva,
  getReservas,
  getReservasPorFecha,
} from "../controllers/reservasController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getReservas);
router.post("/", crearReserva);
router.get("/porFecha", getReservasPorFecha);
router.delete("/:id", eliminarReserva);
router.put("/:id", verifyToken, editarReserva);

export default router;