import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import "dotenv/config"

const app = express();

//Importando rutas

import usersRouter from "./src/routes/userRoutes.js";
import productosRouter from "./src/routes/productos.js";
import sesionRouter from "./src/routes/sesionRoutes.js";
import adminRouter from "./src/routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuracion
app.set('port', process.env.PORT || 3001);


// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/usuarios', usersRouter);
app.use('/api/productos', productosRouter);
app.use("/admin", adminRouter)
app.use(sesionRouter)

//Archivos estaticos
app.use(express.static('src/public'));

// Corriendo el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
});