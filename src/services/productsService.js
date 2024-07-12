import { getProductsByIdModel, deleteProductByIdModel, getProductsByCategoryModel, getAllProductsModel } from "../models/poductsModel.js";

export const getAllProductsService = async()=>{
    try {
        return await getAllProductsModel()
    } catch (error) {
        console.log(error)
        return{isError:true, message:error.message}
    }
}

export const getProductByIdService = async (id)=>{
    try {
        const data = await getProductsByIdModel(id)

        if(!data.isError){
            return{isError:false, ...data.rows};
        }
        return data;
    } catch (error) {
        console.log(error)
        return{isError:true, message:error.message}
    }
};
export const getProductsByCategoryService = async (query)=>{
    try {
        return await getProductsByCategoryModel(query)
    } catch (error) {
        console.log(error);
        return({isError:true, message:error.message})
    }
}

export const deleteProductByIdService = async (id)=>{
    try {
        const data = await deleteProductByIdModel(id)
        if(data.isError){
            return data;
        }
        return{isError:false, message:data.message};
    } catch (error) {
        console.log(error);
        return {isError:true, message:error.message};
    }
};