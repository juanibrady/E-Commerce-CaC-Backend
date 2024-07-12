import { Router } from "express";

const adminRouter = Router();

import { adminIndex, adminProducts, adminCompradores, adminEditCompradores, adminEditProducts } 
from "../controllers/adminController.js";


adminRouter.get("/", adminIndex);

adminRouter.get("/compradores", adminCompradores);
adminRouter.get("/compradores/editComprador", adminEditCompradores);

adminRouter.get("/products", adminProducts);
adminRouter.get("/products/editProduct", adminEditProducts);



export default adminRouter