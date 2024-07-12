import { query } from "express";
import {pool} from "../config/db.js"

export const getAllProductsModel = async()=>{
    try {
        const sql = "SELECT * FROM producto;";

        const [productos]= await pool.query(sql)
        if(productos.length==0){
            return {isError:true, message:`No hay productos en la base de datos`};
        }
        return {isError:false, productos}
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message};
    }
}

export const getProductsByIdModel = async (id) => {
    try {
        const sql = "SELECT * FROM producto WHERE id = ?";
        const values = [id];

        const [rows]= await pool.query(sql, values)
        if(rows.length==0){
            return {isError:true, message:`No existe ningun producto con el id: ${id}`};
        }
        
        return {isError:false, rows}
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message};
    }
};
export const getProductsByCategoryModel = async (query)=>{
    try {
        const sql = `SELECT p.* FROM producto p
        JOIN categoriaproductos cp on cp.id_producto = p.id
        JOIN categorias c on c.id = cp.id_categoria
        WHERE c.nombre = ?;
        `;
        const value = [query];

        const [productos] = await pool.query(sql, value);
        if(productos.length===0){
            return{isError:true, message:"No hay ningun producto con esta categoria"}
        }
        return{isError:false, productos}
    } catch (error) {
        console.log("error aqui",error.message);
        return({isError:true, message:error.message});
    }
}

export const deleteProductByIdModel = async (id)=>{
    try {
        const categoriaSql = `DELETE FROM categoriaproductos WHERE id_producto = ?;`;
        const productoSql = `DELETE FROM producto WHERE id = ?;`;
        const value = [id]

        const [categoriaResult] = await pool.query(categoriaSql, value);
        const [productoResult] = await pool.query(productoSql, value);

        if(categoriaResult.affectedRows > 0 && productoResult.affectedRows > 0){
            return {isError:false, message:"Producto eliminado con exito"}
        };
        return {isError:true, message:`No existe ningun producto con el id: ${id}`}

    } catch (error) {
        console.log(error);
        return {isError:true, message:error.message};
    }
};