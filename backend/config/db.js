import mysql from "mysql2";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
};

async function connectDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexión a la base de datos exitosa');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

export default connectDatabase();