import express from "express";
import {
  crearReserva,
  getReservas,
  getReservasPorFecha,
} from "../controllers/reservasController.js";

const router = express.Router();

router.get("/", getReservas);
router.post("/", crearReserva);
router.get("/porFecha", getReservasPorFecha);

export default router;
