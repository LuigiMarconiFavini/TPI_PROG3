import { User } from "../Models/User.js";
import bcrypt from "bcryptjs"


export const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ msg: "El email ya está registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: "Usuario registrado", user: newUser });
    } catch (err) {
        res.status(500).json({ msg: "Error al registrar", error: err.message });
    }
};


export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: "Contraseña incorrecta" });

        res.json({ msg: "Login exitoso", user });
    } catch (err) {
        res.status(500).json({ msg: "Error en login", error: err.message });
    }
};