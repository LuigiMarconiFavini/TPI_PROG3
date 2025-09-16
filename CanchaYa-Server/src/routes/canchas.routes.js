import { Router } from "express";

const router = Router();

router.get("/canchas", (req, res) => {
    res.send("Obteniendo canchas")
})

export default router;