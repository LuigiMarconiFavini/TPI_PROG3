import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cancha = sequelize.define(
  "Cancha",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    horarios: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);
