import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ msg: "El email ya está registrado" });

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "Usuario registrado", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Error al registrar", error: err.message });
  }
};

const SECRET = "c4nch4Y4";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ msg: "Email o contraseña incorrectos" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ msg: "Email o contraseña incorrectos" });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      msg: "Login exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error en login", error: err.message });
  }
};
