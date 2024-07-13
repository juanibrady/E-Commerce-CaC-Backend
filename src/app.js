import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import "dotenv/config"

const app = express();

//Importando rutas

import usersRouter from "./routes/userRoutes.js";
import productosRouter from "./routes/productos.js";
import sesionRouter from "./routes/sesionRoutes.js";
import adminRouter from "./routes/admin.js";

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
app.use(express.static(path.resolve(__dirname,'./public')));

// Corriendo el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
});