import {Router} from "express";

import {LoginyRegister, RegistrarUsuario,CrearRegistrarUsuario , UsuarioDefault, InformacionTHUsuarioDefault, ConfiguracionEliminarUsuarioById, Login,ActualizarUsuario, CalcularConsumo, HOME, CrearUsuario} from "../controllers/Usuarios.Controller";

const router = Router();

router.get("/", HOME);

//Ruta para pagina de formularios de Login y Register
router.get("/Login&Register", LoginyRegister);

//Ruta para pagina de Inicio de usuarios defaults
router.get("/UsuarioDefault", UsuarioDefault);

//Ruta para pagina de Inicio de usuarios defaults
router.post("/Calculadora", CalcularConsumo);

//Ruta para pagina de Inicio de usuarios defaults de tabla de historial y Tarifas
router.get("/InformacionTHUsuarioDefault", InformacionTHUsuarioDefault);

//Ruta para Crear Usuarios
router.get("/Configuracion/Crear", CrearUsuario);

//Ruta para registrar nuevo usuario
router.post("/Registrar", RegistrarUsuario);

//Ruta para registrar nuevo usuario
router.post("/Login", Login);

export default router;