import mysql from "mysql2/promise"
import "dotenv/config"
export const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DB,
    waitForConnections:"true",
    connectionLimit:5
})