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

// obtener perfil del usuario autenticado
export const getMyProfile = async (req, res) => {
  try {
    // en verifyToken guardamos el payload en req.user
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'password', 'email', 'createdAt']
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

//update users
export const updateUser = async (req,res) => {
    const {id} = req.params;
    const {username,email,role} = req.body; //ver si aca adentro va password tambien
    try{
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({message: "Usuario no encontrado"});

        user.username = username ?? user.username;
        user.email = email ?? user.email;
        //user.password = email ?? user.password;
        user.role = role ?? user.role;

        await user.save();
        res.json({message: "Usuario actualizado", user});
    }catch{
        res.status(500).json({message:"error del server"});
    }
};


// eliminar usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};