import { Router } from 'express';
const usersRouter = Router();

import {getUserByidController, getAllUsersController, deleteUserController, editUserController} from '../controllers/usersController.js';


usersRouter.get('/', getAllUsersController);
usersRouter.get('/user', getUserByidController);
usersRouter.delete("/:id", deleteUserController)
usersRouter.put("/user", editUserController)
// usersRouter.post('/add', save);
// usersRouter.post('/update/:id', update);
// usersRouter.get("/userdata/:id")


export default usersRouter