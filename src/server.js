//importar las rutas correspondientes
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import configObject from './config/config.js';
import open from 'open';  // Importa el paquete open para abrir de una la pagina al iniciar
import userRoutes from './routes/user.routes.js';
import verifyRoutes from './routes/verify.routes.js'



const app = express();
const { mongo_url} = configObject;
// conexion a la base de datos [done mi cluster]
mongoose.connect(mongo_url)
    .then(() => console.log("Conexión exitosa!"))
    .catch((error) => console.log("Error en la conexión", error));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api', verifyRoutes)


const puerto = process.env.PORT || 3000;

// Inicia el servidor y abre la página en el navegador
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
    // Abre la URL en el navegador
});
