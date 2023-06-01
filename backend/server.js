import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';

import { PORT } from "./config/config.js";

//IMPORTAR LAS RUTAS
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productsRoutes.js';

//CONFIGURAR
const baseURL = "/api";
const app = express();
app.set('port', PORT);

//MIDDLEWARES
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// AGREGAR RUTAS
app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/auth`, authRoutes);
app.use(`${baseURL}/products`, productsRoutes);

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
});
