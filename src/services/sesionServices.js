import "dotenv/config"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { POSTregisterModel, POSTloginModel } from "../models/sesionModels.js";
import { signToken } from "../utils/signToken.js";
import { encrypted } from "../utils/encrypted.js";


export const POSTregisterService = async body =>{
    try {
        const {nombre,usuario,password,email}=body;

        if(!(nombre && usuario && password && email)){
            return {isError:true, message:"Asegurate de rellenar todos los campos"}};
        const result = await encrypted(password);
        if(result.isError){return{isError:true, message:result.message, error:result.error}}
        const user = {
            nombre,
            usuario,
            password:result.hash,
            email}

        const status = await POSTregisterModel(user);

        if(status.isError){return{isError:true, message:status.message, error:status.error}}

        return{isError:false};
    } catch (error) {
        return {isError:true, message:"Ocurrio un error de servidor", error}
    };
};

export const POSTloginService = async body=>{
    try {
        const {email, password} = body;


        if(!(password && email)){
            return {isError:true, message:"Asegurate de rellenar todos los campos"}};

        const data = await POSTloginModel(email)
        
        if(data.isError){
            return {isError:true, message:data.message}
        }
        const match = await bcrypt.compare(password, data[0].password)

        if(!match){return{isError:true, message:"Usuario o contraseña invalida"}};
        const token= signToken({nombre:data[0].nombre, usuario:data[0].usuario, email:data[0].correo, rol:data[0].rol});
        return {isError:false, token};

    } catch (error) {
        console.log(error)
        return {isError:true, message:"ocurrio un error en el servidor"};
    };
};


export const GETuserData= (req)=>{
    try {
        const token = req.cookies.userData;
        if(!token){return {isLogged:false, message:"No token provided"}}

        const userData = jwt.verify(token, process.env.SECRET_KEY);

        return {isLogged:true, userData}
    } catch (error) {
        console.error("Error al verificat el token", error);
        return { isLogged: false, message: error.message };
    };
};