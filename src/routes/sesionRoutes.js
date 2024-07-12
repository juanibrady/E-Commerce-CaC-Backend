import { Router } from "express";
import {register, login, logout, userData } from "../controllers/sesionControllers.js";

const sesionRouter = Router()


sesionRouter.post("/register", register);
sesionRouter.post("/login", login);
sesionRouter.get("/logout", logout);
sesionRouter.get("/userdata", userData);

export default sesionRouter