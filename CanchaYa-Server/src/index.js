import express from "express";
import { sequelize } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Rutas
import canchasRoutes from "./routes/canchasRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Models
import "./Models/User.js";
import "./Models/Cancha.js";
import "./Models/Reservas.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/canchas", canchasRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/contact", contactRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    await sequelize.query("PRAGMA foreign_keys = OFF");
    await sequelize.sync({ alter: true });
    await sequelize.query("PRAGMA foreign_keys = ON");
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar:", error);
  }
})();
