import express from "express";
import { sequelize } from "./config/db.js";
import cors from "cors";

//Rutas...
//import canchasRoutes from "./routes/canchasRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

//Models
import "./Models/User.js";
import "./Models/Cancha.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

//app.use("/api/canchas", canchasRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    await sequelize.sync({ alter: true }); // sincroniza tablas según modelos
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar:", error);
  }
})();
