import bcrypt from "bcrypt"
import "dotenv/config"


export const encrypted = async (password)=>{
    try {
        const saltRounds = parseInt(process.env.SALTROUNDS);
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);
        return {isError:false, hash}
    } catch (error) {
        return {isError:true, message:"Ocurrio un error encriptando la contraseña", error}
    }
}

