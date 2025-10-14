import { Reservas } from "../Models/Reservas.js";
import { User } from "../Models/User.js";
import { Cancha } from "../Models/Cancha.js";

export const getReservas = async (req, res) => {
  try {
    const reservas = await Reservas.findAll({
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["id", "username", "email"],
        },
        {
          model: Cancha,
          as: "cancha",
          attributes: [
            "id",
            "nombre",
            "deporte",
            "direccion",
            "precio",
            "imagen",
            "horarios",
          ],
        },
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const crearReserva = async (req, res) => {
  const { canchaId, userId, fechaReserva, horaReserva } = req.body;

  try {
    const cancha = await Cancha.findByPk(canchaId);
    if (!cancha) {
      return res.status(400).json({ error: "Cancha no encontrada" });
    }

    if (!cancha.horarios.includes(horaReserva)) {
      return res.status(400).json({ error: "Ese horario no esta disponible" });
    }

    const reservaExistente = await Reservas.findOne({
      where: { canchaId, fechaReserva, horaReserva },
    });

    if (reservaExistente) {
      return res.status(400).json({ error: "Ese horario ya esta reservado" });
    }

    const nuevaReserva = await Reservas.create({
      canchaId,
      userId,
      fechaReserva,
      horaReserva,
    });

    const nuevosHorarios = cancha.horarios.filter((h) => h !== horaReserva);
    await cancha.update({ horarios: nuevosHorarios });

    const reservaConDatos = await Reservas.findByPk(nuevaReserva.idReserva, {
      include: [
        { model: User, as: "usuario", attributes: ["id", "username", "email"] },
        {
          model: Cancha,
          as: "cancha",
          attributes: [
            "id",
            "nombre",
            "deporte",
            "direccion",
            "precio",
            "imagen",
          ],
        },
      ],
    });

    res.status(201).json({
      message: "Reserva creada con exito",
      reserva: reservaConDatos,
    });
  } catch (err) {
    console.error("Error al crear la reserva:", err);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const getReservasPorFecha = async (req, res) => {
  const { canchaId, fecha } = req.query;

  try {
    const reservas = await Reservas.findAll({
      where: { canchaId, fechaReserva: fecha },
      include: [
        {
          model: Cancha,
          as: "cancha",
          attributes: ["id", "nombre", "deporte", "horarios"],
        },
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas por fecha:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
