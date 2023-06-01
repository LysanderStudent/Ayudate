import bcrypt from 'bcrypt';
import axios from 'axios';
import { UserSchema } from "../models/user.js";

const controller = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserSchema.findOne({ where: { email } });

            if (!user)
                return res.status(401).json({ succes: false, message: 'Credenciales incorrectas' });

            const confirmPassword = await bcrypt.compare(password, user.password);

            if (!confirmPassword)
                return res.status(401).json({ succes: false, message: 'Credenciales incorrectas' });

            return res.status(200).json({ data: user });
        } catch (error) {
            return res.status(500).json({ succes: false, message: 'Error por parte del servidor' });
        }
    },

    logout: (req, res) => {
        return res.send(200).json({ succes: true, message: 'Cierre de sesion completa' });
    },

    register: (req, res) => {
        const { name, email, password } = req.body;

        axios.post('http://localhost:3001/api/users/create-user', { name, email, password })
            .then(response => {
                return res.status(200).json({ user: response.data.newUser });
            })
            .catch(err => {
                return res.status(404).json({ success: false, message: 'Error en al registrar el usuario' });
            });
    },

    loginDummyJSON: (req, res) => {
        const { username, password } = req.body;
        axios.post('https://dummyjson.com/auth/login', { username, password })
            .then(response => {
                return res.status(200).json({ user: response.data });
            })
            .catch(err => {
                return res.status(404).json({ success: false, message: 'Credenciales incorrectas' });
            });
    },
};

export default controller;