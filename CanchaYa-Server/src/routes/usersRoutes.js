import express from "express";
import { getAllUsers, getUserById } from "../controllers/usersController.js";

const router = express.Router();

//router.use(verifyToken, checkRole('sysadmin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;