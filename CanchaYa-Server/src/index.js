import express from 'express'
import { sequelize } from './config/db.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())

//Rutas...
import canchasRoutes from "./routes/canchas.routes.js"
//import userRoutes from "./routes/users.routes.js";

//Models
import "./Models/Users.js"

try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    await sequelize.sync();
    console.log("Base de datos sincronizada");

    app.use(canchasRoutes)
    //app.use(userRoutes)


    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (error) {
    console.error("Error al inicializar:", error);
}

