import mysql from "mysql2/promise";
import { config } from "./config";

export const connect = async () => {
  try {
    console.log("Conexión a la base de datos exitosa");
    return await mysql.createConnection(config);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
};
