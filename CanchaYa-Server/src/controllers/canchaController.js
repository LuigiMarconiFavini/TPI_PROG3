import { Cancha } from "../Models/Cancha.js";

// get
export const getCanchas = async (req, res) => {
  try {
    const { deporte, tipo, horario } = req.query;
    let where = {};

    if (deporte) where.deporte = deporte;
    if (tipo) where.tipo = tipo;

    const canchas = await Cancha.findAll({ where });

    // 🔹 Filtrar por horario si se pasó
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

    // 🔹 Ordenar los horarios dentro de cada cancha
    const conHorariosOrdenados = filtradas.map((c) => {
      let horariosArray;

      try {
        horariosArray = Array.isArray(c.horarios)
          ? c.horarios
          : JSON.parse(c.horarios || "[]");

        horariosArray.sort((a, b) => {
          const [ha, ma] = a.split(":").map(Number);
          const [hb, mb] = b.split(":").map(Number);
          return ha * 60 + ma - (hb * 60 + mb); // compara en minutos
        });
      } catch {
        horariosArray = [];
      }

      return {
        ...c.toJSON(),
        horarios: horariosArray,
      };
    });

    res.json(conHorariosOrdenados);
  } catch (error) {
    console.error("Error al traer las canchas", error);
    res.status(500).json({ error: "Error al traer las canchas" });
  }
};

// get por id
export const getCanchaById = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });

    // ordenar horarios
    let horariosArray = [];
    try {
      horariosArray = Array.isArray(cancha.horarios)
        ? cancha.horarios
        : JSON.parse(cancha.horarios || "[]");
      horariosArray.sort((a, b) => {
        const [ha, ma] = a.split(":").map(Number);
        const [hb, mb] = b.split(":").map(Number);
        return ha * 60 + ma - (hb * 60 + mb);
      });
    } catch {
      horariosArray = [];
    }

    res.json({ ...cancha.toJSON(), horarios: horariosArray });
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

export const getAllCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.findAll({
      attributes: [
        "id",
        "nombre",
        "deporte",
        "tipo",
        "direccion",
        "precio",
        "horarios",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(canchas);

    const conHorariosOrdenados = canchas.map((c) => {
      let horariosArray;
      try {
        horariosArray = Array.isArray(c.horarios)
          ? c.horarios
          : JSON.parse(c.horarios || "[]");
        horariosArray.sort((a, b) => {
          const [ha, ma] = a.split(":").map(Number);
          const [hb, mb] = b.split(":").map(Number);
          return ha * 60 + ma - (hb * 60 + mb);
        });
      } catch {
        horariosArray = [];
      }
      return { ...c.toJSON(), horarios: horariosArray };
    });

    res.json(conHorariosOrdenados);
  } catch {
    console.error("Error al obtener Canchas", error);
    res.status(500).json({ message: "error del server" });
  }
};
