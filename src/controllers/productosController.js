
import { getProductByIdService, deleteProductByIdService, getProductsByCategoryService, getAllProductsService } from "../services/productsService.js";

export const getAllProducts = async (req,res)=>{
    try {
        const data = await getAllProductsService()
        if(data.isError){
            throw new Error(data.message);
        }
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({isError:true, message:error.message}) 
    }
}

export const getProductsByCategory = async (req, res) =>{
    try {
        const data = await getProductsByCategoryService(req.query.categoria)
        if(data.isError){
            throw new Error(data.message);
        }
        res.json(data)
    } catch (error) {
        res.json({isError:true, message:error.message})
    }
}

export const getProductById = async (req, res) => {
    try {
        const data = await getProductByIdService(req.params.id)
        if(data.isError){
            throw new Error(data.message);
        };
        res.send(data[0]);
    } catch (error) {
        console.log(error)
        res.send("ocurrio un error")
    }

};

export const deleteProductById = async (req,res)=>{
    try {
        const data = await deleteProductByIdService(req.params.id);
        if(data.isError){
            throw new Error(data.message);
        };

        res.json({isError:false, message:data.message});
    } catch (error) {
        console.log(error)
        res.json({isError:false, message:error.message})
    }
}

