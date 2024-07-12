import {getUserByidService, getAllUsersService, deleteUserservice, editUserService} from "../services/userServices.js"

export const getAllUsersController = async (req, res) => {
    try {
        const data = await getAllUsersService();
        if(data.isError){
            throw new Error(data.message)
        }
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({isError:true, message:error.message})
    }
};

export const getUserByidController = async (req,res)=>{
    try {
        const data = await getUserByidService(req.query.id);
        if(data.isError){
           throw new Error(data.message);
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({isError:true, message:error.message})
    }
}

export const deleteUserController = async (req,res) => {
    try {
        const data = await deleteUserservice(req.params.id);
        if(data.isError){
            throw new Error(data.message);
        };
        res.json(data);   
    } catch (error) {
        console.log(error);
        res.json({isError:true, message:error.message});
    };
};

export const editUserController = async (req,res)=>{
    try {
        const data = await editUserService(req.query.id, req.body);
        if(data.isError){
            throw new Error(data.message);
        };
        res.json(data);   
    } catch (error) {
        console.log(error);
        res.json({isError:true, message:error.message});
    };
}

// export const update = (req,res) => {
//     const { id } = req.params;
//     const newComprador = req.body;

//     req.getConnection((err ,conn ) => {
//         conn.query('UPDATE comprador set ? WHERE id = ?', [newComprador, id], (err, rows) => {
//             res.send(rows);
//         });
//     })
// };


