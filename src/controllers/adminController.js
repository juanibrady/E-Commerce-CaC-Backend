import { GETuserData } from "../services/sesionServices.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const  adminIndex = (req,res)=>{
    const data = GETuserData(req)
    if(data.isLogged && data.userData.rol==="admin"){
        return res.sendFile(path.join(__dirname, "../admin/index.html"))
    }
    res.send("No tienes acceso")
}

export const  adminProducts = (req,res)=>{
    const data = GETuserData(req)
    if(data.isLogged && data.userData.rol==="admin"){
        return res.sendFile(path.join(__dirname, "../admin/productos.html"))
    }
    res.send("No tienes acceso")
}
export const  adminCompradores = (req,res)=>{
    const data = GETuserData(req)
    if(data.isLogged && data.userData.rol==="admin"){
        return res.sendFile(path.join(__dirname, "../admin/compradores.html"))
    }
    res.send("No tienes acceso")
}
export const  adminEditProducts = (req,res)=>{
    const data = GETuserData(req)
    if(data.isLogged && data.userData.rol==="admin"){
        return res.sendFile(path.join(__dirname, "../admin/editProductos.html"))
    }
    res.send("No tienes acceso")
}
export const  adminEditCompradores = (req,res)=>{
    const data = GETuserData(req)
    if(data.isLogged && data.userData.rol==="admin"){
        return res.sendFile(path.join(__dirname, "../admin/editCompradores.html"))
    }
    res.send("No tienes acceso")
}