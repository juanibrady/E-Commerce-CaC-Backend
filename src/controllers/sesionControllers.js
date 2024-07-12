import { POSTregisterService, POSTloginService, GETuserData } from "../services/sesionServices.js"

export const register = async (req,res)=>{
    try {
        const data = await POSTregisterService(req.body);
        if(data.isError){
            throw new Error(data.message)
        }
        res.json({data})
    } catch (error) {
        console.log(error)
        console.log(error)
        res.json({isError:true, message:error.message})
    }
}

export const login = async (req,res)=>{
    try {
        const result = await POSTloginService(req.body);
        if(result.isError){
            throw new Error(result.message);
        };
        res
        .cookie("userData", result.token, {httpOnly:true})
        .json({isError:false, message:"Login exitoso"});
    } catch (error) {
        res.status(500).json({isError:true, message:error.message})
    };
};
export const logout = (req,res)=>{
    res
    .clearCookie("userData")
    .json({ isError: false, message: "Sesión cerrada exitosamente" });
};

export const userData = (req,res)=>{
    const result = GETuserData(req);
    if(result.isLogged){
        return res.
        json({islogged:result.isLogged,
            userData:result.userData})
    };
    res.json(result);
};