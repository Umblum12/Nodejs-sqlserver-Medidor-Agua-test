//inicialización
import express from "express";
import config from "./config";

import usuariosRoutes from "./routes/Usuarios.routes";
import adminRoutes from "./routes/Admin.routes";
const path = require(`path`);
const app = express();
const session = require('express-session');
const MssqlStore = require('mssql-session-store')(session);

//settings
app.set("port", config.port);

//motor de plantillas
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'ejs');

// invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//Variables Globales
app.use((req,res,next)=>{
    next();
});

//variables de session


//archivos estaticos public
app.use(express.static(path.join(__dirname,"public")));
app.use('/Css', express.static(__dirname + 'public/Css'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Rutas
app.use(usuariosRoutes);
app.use(adminRoutes);

export default app;