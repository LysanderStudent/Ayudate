import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { PORT } from "./config/config.js";

//IMPORTAR LAS RUTAS

//CONFIGURAR
const baseURL = "/api";
const app = express();
app.set('port', PORT);

//MIDDLEWARES
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// AGREGAR RUTAS

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
});
