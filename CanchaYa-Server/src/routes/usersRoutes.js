import express from "express";
import { getAllUsers, getMyProfile, getUserById, updateUser } from "../controllers/usersController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { checkRole } from "../Middleware/roleMiddleware.js";

const router = express.Router();

//router.use(verifyToken, checkRole('sysadmin'))

router.get('/', getAllUsers);
router.get('/me', verifyToken, getMyProfile);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;