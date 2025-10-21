import { Reservas } from "../Models/Reservas.js";
import { User } from "../Models/User.js";
import { Cancha } from "../Models/Cancha.js";
import { Op } from "sequelize";

// Obtener todas las reservas
export const getReservas = async (req, res) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }

    const reservas = await Reservas.findAll({
      where,
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
            "horarios"
          ],
        },
      ],
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error al cargar reservas" });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  const { canchaId, userId, fechaReserva, horaReserva } = req.body;

  try {
    const cancha = await Cancha.findByPk(canchaId);
    if (!cancha) {
      return res.status(400).json({ error: "Cancha no encontrada" });
    }

    if (!cancha.horarios.includes(horaReserva)) {
      return res.status(400).json({ error: "Ese horario no está disponible" });
    }

    const reservaExistente = await Reservas.findOne({
      where: { canchaId, fechaReserva, horaReserva },
    });

    if (reservaExistente) {
      return res.status(400).json({ error: "Ese horario ya está reservado" });
    }

    const nuevaReserva = await Reservas.create({
      canchaId,
      userId,
      fechaReserva,
      horaReserva,
    });

    const nuevosHorarios = cancha.horarios.filter((h) => h !== horaReserva);
    await cancha.update({ horarios: nuevosHorarios });

    const reservaConDatos = await Reservas.findOne({
      where: { idReserva: nuevaReserva.idReserva },
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
      message: "Reserva creada con éxito",
      reserva: reservaConDatos,
    });
  } catch (err) {
    console.error("Error al crear la reserva:", err);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

// Obtener reservas por fecha
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

// Eliminar reserva
export const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reservas.findOne({ where: { idReserva: req.params.id } });
    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });

    const cancha = await Cancha.findByPk(reserva.canchaId);
    if (cancha) {
      const horariosActualizados = [...cancha.horarios, reserva.horaReserva];
      await cancha.update({ horarios: horariosActualizados });
    }

    await reserva.destroy();
    res.json({ message: "Reserva eliminada y horario liberado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Editar reserva
export const editarReserva = async (req, res) => {
  const { id } = req.params;
  const { fechaReserva, horaReserva } = req.body;

  try {
    const reserva = await Reservas.findOne({ where: { idReserva: id } });
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // Validar que el usuario autenticado es el dueño de la reserva
    if (reserva.userId !== req.user.id) {
      return res.status(403).json({ error: "No tienes permiso para editar esta reserva" });
    }

    const cancha = await Cancha.findByPk(reserva.canchaId);
    if (!cancha) {
      return res.status(400).json({ error: "Cancha no encontrada" });
    }

    // Verificar si el nuevo horario está disponible (que no esté reservado por otra)
    const reservaExistente = await Reservas.findOne({
      where: {
        canchaId: reserva.canchaId,
        fechaReserva,
        horaReserva,
        idReserva: { [Op.ne]: id },
      },
    });

    if (reservaExistente) {
      return res.status(400).json({ error: "Ese horario ya está reservado" });
    }

    // 👉 Solo actualizar los horarios si cambió el horario
    if (reserva.horaReserva !== horaReserva) {
      // Liberar el horario anterior (devolverlo a la cancha)
      const horariosActualizados = [...cancha.horarios, reserva.horaReserva];

      // Ocupamos el nuevo horario
      const nuevosHorarios = horariosActualizados.filter(h => h !== horaReserva);

      await cancha.update({ horarios: nuevosHorarios });
    }

    // Actualizar la reserva con los nuevos valores
    await reserva.update({ fechaReserva, horaReserva });

    // 👉 Buscar la reserva ya actualizada con includes para enviarla al frontend
    const reservaConDatos = await Reservas.findOne({
      where: { idReserva: reserva.idReserva },
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
            "horarios",
          ],
        },
      ],
    });

    res.json({
      message: "Reserva actualizada correctamente",
      reserva: reservaConDatos,
    });
  } catch (error) {
    console.error("Error al editar reserva:", error);
    res.status(500).json({ error: "Error al editar la reserva" });
  }
};

