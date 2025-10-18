import express from "express";
import {
  crearReserva,
  eliminarReserva,
  getReservas,
  getReservasPorFecha,
} from "../controllers/reservasController.js";

const router = express.Router();

router.get("/", getReservas);
router.post("/", crearReserva);
router.get("/porFecha", getReservasPorFecha);
router.delete("/:id", eliminarReserva);

export default router;
