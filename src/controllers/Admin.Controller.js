import { getConnection, querys, sql } from "../database";

/* Se mirara la pagina principal de administrador */
export const UsuarioAdministrador = async (req, res) => {
    const { aguam3, TarifasPrecio, resultmul } = req.body;
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllTarifas);
    const r=0;
    res.render('UsuarioAdministrador',{
        result,
        r
    });
};

/* Se muestra todoa la informacion de las tablas tarifas y historial desde el usuario administrador */
export const InformacionTHUsuarioAdministrador = async (req, res) => {
    const pool = await getConnection();
    const Tarifas = await pool.request().query(querys.getAllTarifas);
    const Historial = await pool.request().query(querys.getAllHistorial);
    res.render('InformacionTHUsuarioAdministrador',{
        Tarifas,
        Historial
    });
};

/*  */
export const InformacionTHUsuarioAdministradorEliminareUsuarioById = async (req, res) => {
    const {ID} = req.params;    
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("ID", req.params.ID)
        .query(querys.deleteUsuario);
        res.redirect('/InformacionTHUsuarioAdministrador');
};

/* Se miraran todos los usuarios registrados desde panel de configuracion del administrador */
export const ConfiguracionAdministrador = async (req, res) => {
    const pool = await getConnection();
    const Usuarios = await pool
    .request()
    .query(querys.getAllUsuarios);
    res.render('Config',{
        Usuarios
    });
};

/* Ruta para editar los registros de usuarios */
export const EditarUsuario = async (req, res) => {
    const {ID} = req.params;    
    const pool = await getConnection();
    const result1 = await pool
        .request()
        .input("ID", req.params.ID)
        .query(querys.selectUsuarioById);
    res.render('Editar',{
        result1
    });
};

/* Ruta para obtener id de tarifa seleccionada y redirecionar a la pagina editar */
export const EditarTarifas = async (req, res) => {
    const {ID} = req.params;    
    const pool = await getConnection();
    const result1 = await pool
        .request()
        .input("ID", req.params.ID)
        .query(querys.selectTarifaById);
    res.render('Editar',{
        result1
    });
};

/* Actualizar datos de tabla de usuarios ya registrados con el id desde panel de configuracion del administrador*/
export const ConfiguracionAdministradorActualizarUsuario = async (req, res) => {
    const {ID,Nombre, ApellidoPa, ApellidoMa, NumTel, Direccion, Sexo, Password } = req.body;
    //validacion
    if ( ID == null || Nombre == null || ApellidoPa == null || ApellidoMa == null || NumTel == null || Direccion == null || Sexo == null || Password == null) {
        res.render('Editar',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡No se puede dejar los campos vacios!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }
   try {
    const pool = await getConnection();
   await pool
        .request()
        .input("ID", sql.Int, ID)
        .input("Nombre", sql.VarChar, Nombre)
        .input("ApellidoPa", sql.VarChar, ApellidoPa) 
        .input("ApellidoMa", sql.VarChar, ApellidoMa)
        .input("NumTel", sql.VarChar, NumTel)
        .input("Direccion", sql.VarChar, Direccion)
        .input("Sexo", sql.Char, Sexo)
        .input("Password", sql.VarChar, Password)
        .query(querys.uptdateUsuarioById);
        res.redirect('/Configuracion');
   } catch (error) {
    res.status(500);
    res.send(error.message);
   }
};

/* Eliminar usuarios con el id desde panel de configuracion del administrador */
export const ConfiguracionAdministradorEliminarUsuarioById = async (req, res) => {
    const {ID} = req.params;    
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("ID", req.params.ID)
        .query(querys.deleteUsuario);
        res.redirect('/Configuracion');
};

/* Crear nuevo usuario desde panel de configuracion del administrador */
export const CrearRegistrarUsuario = async (req, res) => {
    const { id, nombre, apellidopa, apellidoma, direccion, numtel, sexo, password, rango} = req.body;
    let ex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)(\.zw{2,3,4})+$/;
    const expresion_regular = /^[0-9] {5} $/;
    if (id == "" || nombre == "" || apellidopa == "" || apellidoma == "" || direccion == "" || numtel == "" || sexo == "" || password == "" || rango == "") {
        res.render('Crear',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡No se puede dejar los campos vacios!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }
    else{
        try {
            const pool = await getConnection();
            await pool
                .request()
                .input("id", sql.VarChar, id)
                .input("nombre", sql.VarChar, nombre)
                .input("apellidopa", sql.VarChar, apellidopa) 
                .input("apellidoma", sql.VarChar, apellidoma)
                .input("direccion", sql.VarChar, direccion)
                .input("numtel", sql.VarChar, numtel)
                .input("sexo", sql.Char, sexo)
                .input("password", sql.VarChar, password)
                .input("rango", sql.Char, rango)
                .query(querys.usuariosPA);
        res.render('Crear',{
            alert: true,
            alertTitle: "Registrado",
            alertMessage: "!Registro Exitoso¡",
            alertIcon: 'success',
            showConfirmButton:false,
            timer:1500,
            ruta:''
        });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
};