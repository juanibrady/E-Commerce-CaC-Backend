import { getUserByidModel, getAllUsersModel, deleteUserModel, editUserModel } from "../models/userModels.js";

export const getAllUsersService = async ()=>{
    try {
        return await getAllUsersModel();
    } catch (error) {
        console.log(error);
        return {isError:true, message:error.message}
    }
}

export const getUserByidService = async (id)=>{
    try {
        return await getUserByidModel(id)
    } catch (error) {
        console.log(error)
        return{isError:true, message:error.message}
    }
}

export const deleteUserservice = async (id)=>{
    try {
        return await deleteUserModel(id);
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message};
    }
}

export const editUserService = async (id, body)=>{
    try { 
        return await editUserModel(id, body);
    } catch (error) {
        console.log(error);
        return{isError:true, message:error.message};
    }
}