import { Reservas } from "../Models/Reservas.js";
import { User } from "../Models/User.js";
import { Cancha } from "../Models/Cancha.js"

export const getReservas = async (req, res) => {
  try {
    const reservas = await Reservas.findAll({
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Cancha,
          as: 'cancha',
          attributes: ['id', 'nombre', 'deporte', 'horarios']
        }
      ]
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// controllers/reservaController.js
export const crearReserva = async (req, res) => {
  const { canchaId, userId, fechaReserva, horaReserva } = req.body;

  try {
    // Verificar si ya hay una reserva en esa fecha y hora
    const reservaExistente = await Reservas.findOne({
      where: {
        canchaId,
        fechaReserva,
        horaReserva,
      },
    });

    if (reservaExistente) {
      return res.status(400).json({ error: "Ese horario ya está reservado." });
    }

    // Crear nueva reserva
    const nuevaReserva = await Reservas.create({
      canchaId,
      userId,
      fechaReserva,
      horaReserva,
    });

    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};