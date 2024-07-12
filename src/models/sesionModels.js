import { pool } from "../config/db.js"

export const POSTregisterModel = async (user) => {
    try {
        // Verificar si el correo ya existe
        const checkEmailSql = `SELECT COUNT(*) as count FROM comprador WHERE correo = ?`;
        const [checkEmailRows] = await pool.query(checkEmailSql, [user.email]);

        if (checkEmailRows[0].count > 0) {
            return { isError: true, message: "El correo ya está en uso" };
        }

        // Insertar nuevo comprador
        const insertCompradorSql = `INSERT INTO comprador (nombre, usuario, correo, password) VALUES (?,?,?,?)`;
        const insertCompradorValues = [user.nombre, user.usuario, user.email, user.password];
        const [insertCompradorRows] = await pool.query(insertCompradorSql, insertCompradorValues);

        const compradorId = insertCompradorRows.insertId;

        // Insertar rol del comprador
        const insertRolesSql = `INSERT INTO roles (rol, comprador_id) VALUES (?,?)`;
        const insertRolesValues = ['usuario', compradorId];
        await pool.query(insertRolesSql, insertRolesValues);

        return { isError: false, data: insertCompradorRows };
    } catch (error) {
        console.log(error);
        return { isError: true, message: "Ocurrió un error en la base de datos", error };
    }
}

export const POSTloginModel = async (email)=>{
    try {
        const sql = `
        SELECT comprador.*, roles.rol
        FROM comprador
        JOIN roles ON comprador.id = roles.comprador_id
        WHERE comprador.correo = ?`
        const values = [email]

        let [rows] = await pool.query(sql, values);
        if(!rows){
            return {isError:true, message:"Usuario o contraseña invalida"};
        }
        console.log(rows)
        return {isError:false, ...rows}
    } catch (error) {
        return {isError:true, message:"Ocurrio un error en la base de datos", error}
    }
}