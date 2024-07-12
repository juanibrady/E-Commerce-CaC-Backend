import jwt from "jsonwebtoken"
import "dotenv/config"

export const signToken = (user)=>{
    const token=jwt.sign(user,process.env.SECRET_KEY, {expiresIn:"1h"});
    return token
}