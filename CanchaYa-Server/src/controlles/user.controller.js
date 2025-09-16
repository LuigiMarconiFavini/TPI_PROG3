import { User } from "../Models/Users";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error('Error en el registro', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const SECRET = process.env.JWT_SECRET || 'supersecreto'; // fallback por si no usás .env

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};