import { UserSchema } from "../models/user.js";

const controller = {
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const newUser = new UserSchema({ name, email, password });
            await newUser.save();
            return res.status(201).json({ success: true, newUser });
        } catch (error) {
            console.error('Error al insertar el registro en la base de datos:', error);
            return res.status(500).json({ success: false, error: 'Error al insertar el registro en la base de datos' });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await UserSchema.findByPk(id);

            if (!user)
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });

            user.name = name;
            user.email = email;
            user.password = password;
            await user.save();

            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Error al actualizar el usuario' });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserSchema.findByPk(id);

            if (!user)
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });

            await UserSchema.destroy({ where: { id } });
            return res.status(200).json({ success: true, message: 'Usuario eliminado' });

        } catch (error) {
            return res.status(500).json({ success: false, error: 'Error al eliminar el usuario' });
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserSchema.findByPk(id);
            if (!user)
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });

            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Error al encontrar el usuario' });
        }
    },
};

export default controller;