import {pool} from "../config/db.js"

export const getAllUsersModel = async ()=>{
    try {
        const sql = `SELECT p.id, p.nombre, p.usuario, p.correo, r.rol 
        FROM comprador p
        JOIN roles r ON p.id = r.comprador_id` 
        const [usuarios]= await pool.query(sql);
        if(usuarios.length===0){
            return {isError:true, message:"No hay usuarios en la base de datos"};
        };
        return {isError:false, usuarios}
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message}
    }
}

export const getUserByidModel = async  (id)=>{
    try {
        const sql=`SELECT p.nombre, p.usuario, p.correo, r.rol 
        FROM comprador p
        JOIN roles r ON p.id = r.comprador_id
        WHERE p.id = ?`;

        const value= [id];

        const [usuario] = await pool.query(sql,value);
        if(usuario.length===0){
            return {isError:true, message:"Usuario inexistente"};
        };
        return {isError:false, usuario}
    } catch (error) {
        console.log(error);
        return {isError:true, message:error.message};
    };
};

export const deleteUserModel = async (id)=>{
    try {
        const compradorSql = `DELETE FROM comprador WHERE id = ?;`;
        const rolSql = `DELETE FROM roles WHERE comprador_id = ?;`;
        const value = [id];

        const [rolRows]= await pool.query(rolSql, value)
        const [compradorRows] = await pool.query(compradorSql, value);

        if(compradorRows.affectedRows===0 && rolRows.affectedRows===0){
            return {isError:true, message:"Usuario inexistente"};
        };
        return{isError:false, message:"Usuario eliminado con exito"};
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message}
    }
}

export const editUserModel = async (id, usuario)=>{
    try {
        const userSql = `UPDATE comprador
            SET nombre = ?, usuario = ?, correo = ?
            WHERE id = ?;`;

        const rolSql = `UPDATE roles
            SET rol = ?
            WHERE id = ?;`;

        const [userRows] = await pool.query(userSql, [usuario.nombre, usuario.usuario, usuario.correo, id]);
        const [rolRows] = await pool.query(rolSql, [usuario.rol, id]);

        if (userRows.affectedRows === 0) {
            return { isError: true, message: "Usuario inexistente" };
        }

        return { isError: false, message: "Usuario actualizado con éxito" };
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message}
    }
}