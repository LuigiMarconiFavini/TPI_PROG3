import express from "express";
import { getReservas } from "../controllers/reservasController.js";

const router = express.Router();

router.get("/reservas", getReservas)

export default router;