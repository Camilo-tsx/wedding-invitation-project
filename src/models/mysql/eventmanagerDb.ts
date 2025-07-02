import mysql, { ConnectionOptions } from "mysql2/promise"



const config: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

export const db = await mysql.createConnection(config);