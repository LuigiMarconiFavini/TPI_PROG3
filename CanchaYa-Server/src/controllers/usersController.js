import { User } from "../Models/User.js";

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
        });
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios", error);
        res.status(500).json({ message: "error del server" });
    }
};

//obtener por el id
export const getUserById = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'email', 'role']
        });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "error del server" });
    }

};