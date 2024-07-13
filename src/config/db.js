import mysql from "mysql2/promise"
import "dotenv/config"
export const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB,
    password:process.env.DB_PASSWORD,
    waitForConnections:"true",
    connectionLimit:5
})