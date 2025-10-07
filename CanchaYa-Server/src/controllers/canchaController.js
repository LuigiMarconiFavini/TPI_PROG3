import { Cancha } from "../Models/Cancha.js";

// get
export const getCanchas = async (req, res) => {
  try {
    const { deporte, tipo, horario } = req.query;
    let where = {};

    if (deporte) where.deporte = deporte;
    if (tipo) where.tipo = tipo;

    const canchas = await Cancha.findAll({ where });

    // Filtrar por horario en JS, porque horarios es un JSON
    const filtradas = horario
      ? canchas.filter((c) => {
          try {
            const horariosArray = Array.isArray(c.horarios)
              ? c.horarios
              : JSON.parse(c.horarios || "[]");
            return horariosArray.includes(horario);
          } catch {
            return false;
          }
        })
      : canchas;

    res.json(filtradas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al traer las canchas" });
  }
};

// get por id
export const getCanchaById = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });
    res.json(cancha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// post
export const createCancha = async (req, res) => {
  try {
    const { nombre, deporte, tipo, direccion, precio, horarios, imagen } =
      req.body;

    // Opcional: validar que todos los campos necesarios estén presentes
    if (!nombre || !deporte || !tipo || !direccion || !precio || !horarios) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const cancha = await Cancha.create({
      nombre,
      deporte,
      tipo,
      direccion,
      precio,
      horarios,
      imagen,
    });

    res.status(201).json(cancha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// put = actualizar :v
export const updateCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });

    const { nombre, deporte, tipo, direccion, precio, horarios, imagen } =
      req.body;
    await cancha.update({
      nombre,
      deporte,
      tipo,
      direccion,
      precio,
      horarios,
      imagen,
    });
    res.json(cancha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete
export const deleteCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });

    await cancha.destroy();
    res.json({ message: "Cancha eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllCanchas = async(req, res) => {
  try {
    const canchas = await Cancha.findAll({
      attributes: ['id', 'nombre', 'deporte', 'tipo', 'direccion', 'precio', 'horarios', 'createdAt', 'updatedAt' ]
    });
    res.json(canchas);
  } catch {
    console.error("Error al obtener Canchas", error);
    res.status(500).json({ message: "error del server" });
  }
}