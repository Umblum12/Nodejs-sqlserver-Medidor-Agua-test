import {Router} from "express";
import {UsuarioAdministrador,InformacionTHUsuarioAdministrador,InformacionTHUsuarioAdministradorEliminareUsuarioById,ConfiguracionAdministrador,EditarUsuario,EditarTarifas,ConfiguracionAdministradorActualizarUsuario,ConfiguracionAdministradorEliminarUsuarioById,CrearRegistrarUsuario} from "../controllers/Admin.Controller";
const router1 = Router();

//Ruta para pagina de Inicio de Administrador
router1.get("/UsuarioAdministrador", UsuarioAdministrador);

//Ruta para pagina de Inicio de usuarios Administrador de tabla de historial y Tarifas
router1.get("/InformacionTHUsuarioAdministrador", InformacionTHUsuarioAdministrador);

//Ruta para eliminar Tarifas con el id
router1.get("/InformacionTHUsuarioAdministrador/:ID", InformacionTHUsuarioAdministradorEliminareUsuarioById);

//Ruta para pagina de Configuracion de usuarios Administrador de tabla de Usuarios y mas tablas
router1.get("/Configuracion", ConfiguracionAdministrador);

//Ruta para pagina de usuarios Administrador Configuracion Editar tabla de Usuarios y mas tablas
router1.get("/Configuracion/Editar/:ID", EditarUsuario);

//Ruta para Editar Tarifas con el id
router1.get("/Configuracion/Editar/:ID", EditarTarifas);

//Ruta para pagina de usuarios Administrador Configuracion Actualizar tabla de Usuarios y mas tablas
router1.post("/Configuracion/Editar/Actualizar", ConfiguracionAdministradorActualizarUsuario);

//Ruta para eliminar Usuarios con el id
router1.get("/Configuracion/Eliminar/:ID", ConfiguracionAdministradorEliminarUsuarioById);

//Ruta para create nuevo usuario
router1.post("/Configuracion/Crear/Registrar", CrearRegistrarUsuario);

export default router1;