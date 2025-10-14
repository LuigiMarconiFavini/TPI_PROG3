import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Cancha } from "./Cancha.js";

export const Reservas = sequelize.define(
  "Reservas",
  {
    idReserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaReserva: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaReserva: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Reservas.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "usuario",
});

Reservas.belongsTo(Cancha, {
  foreignKey: {
    name: "canchaId",
    allowNull: false,
  },
  as: "cancha",
});

User.hasMany(Reservas, { foreignKey: "userId", as: "reservas" });
Cancha.hasMany(Reservas, { foreignKey: "canchaId", as: "reservas" });
