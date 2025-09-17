import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';
import { Router } from "express"; //VEER ESTOO

const router = Router();

router.post('/users/register', register);
router.post('/users/login', login);

export default router;
