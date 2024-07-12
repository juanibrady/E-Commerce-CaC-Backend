import express from 'express';
const productosRouter = express.Router();

import {getAllProducts, getProductById, deleteProductById, getProductsByCategory,} from '../controllers/productosController.js';

productosRouter.get('/', getProductsByCategory);
productosRouter.get('/listar', getAllProducts);
productosRouter.get('/:id', getProductById);
productosRouter.delete("/:id", deleteProductById);



export default productosRouter