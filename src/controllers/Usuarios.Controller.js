import bcryptjs from "bcryptjs";
import { getConnection, querys, sql } from "../database";

//
export const LoginyRegister = async (req, res) => {
    res.render('Login&Register');
    };

export const UsuarioDefault = async (req, res) => {
    const { aguam3, TarifasPrecio, resultmul } = req.body;
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllTarifas);
    const Usuarios = await pool.request().query(querys.getAllUsuarios);
    const r=0;
    const Nombre = "";
    res.render('UsuarioDefault',{
        Nombre,
        Usuarios,
        result,
        r,
    });
    };

export const HOME = async (req, res) => {
    res.render('Login&Register');
};

export const CalcularConsumo = async (req, res) => {
    const { aguam3, TarifasPrecio } = req.body;
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllTarifas);
    function multiplicar() {
        const m1 = aguam3;
        const m2 = TarifasPrecio;
        const r = m1*m2;
        console.log(r);
        res.render('UsuarioDefault',{
            r,
            result,
        });
    }
    console.log(multiplicar());   
};

export const InformacionTHUsuarioDefault = async (req, res) => {
    const pool = await getConnection();
    const Tarifas = await pool.request().query(querys.getAllTarifas);
    const Historial = await pool.request().query(querys.getAllHistorial);
    res.render('InformacionTHUsuarioDefault',{
        Tarifas,
        Historial
    });
};

//Ruta para editar los registros de Tarifas
export const CrearUsuario = async (req, res) => {
    res.render('Crear');
};

export const RegistrarUsuario = async (req, res) => {
    const { Nombre, ApellidoPa, ApellidoMa, NumTel, Direccion, Sexo, Password, Password2} = req.body;
    let ex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)(\.zw{2,3,4})+$/;
    var CaracteresEspeciales = /[HM-hm]/ ;
    var expresionRegular1=/^([0-9]+){10}$/;//<--- con esto vamos a validar el numero de telefono
    if (Nombre == "" || ApellidoPa == "" || ApellidoMa == "" || NumTel == "" || Direccion == "" || Sexo == "" || Password == "" || Password2 == "") {
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡No se puede dejar los campos vacios!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }else if (Password !== Password2) {
        return res.sendStatus(300);
        /*
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "!Las contraseñas no coinciden¡",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
        */
    } 
    //validando que no entren Numeros en el Nombre
    else if (Nombre.match(/[0-9]/g) || Nombre.length <= 3) {
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡El nombre no puede contener digitos y su longitud tiene que ser mayor de 3 caracteres!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }
    //validando que no entren Numeros en el Apellido
    else if (ApellidoPa.match(/[0-9]/g) || ApellidoPa.length <= 3) {
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡El apellido paterno no puede contener digitos y su longitud tiene que ser mayor de 3 caracteres!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }
    //validando que no entren Numeros en el Apellido
    else if (ApellidoMa.match(/[0-9]/g) || ApellidoMa.length <= 3) {
        return res.sendStatus(300);
       /* res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡El apellido materno no puede contener digitos y su longitud tiene que ser mayor de 3 caracteres!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        }); */
    }
    //validando que no entren Letras en el Numero de Telefóno
    else if (!expresionRegular1.test(NumTel) || NumTel.length > 10)
    {
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡Numero de telefono incorrecto no puede contener letras y debe se de tener 10 caracteres!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
    }
    //validando que no entren Numeros en el Sexo
    else if (Sexo.match(/[0-9]/g) || !CaracteresEspeciales.test(Sexo) || Sexo.length >= 2) {
        return res.sendStatus(300);
        /*
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡El Sexo no puede contener digitos y su longitud tiene que ser igual a 1 caracter!",
            alertIcon: 'error',
            showConfirmButton:false,
            timer:2500,
            ruta:''
        });
        */
    }
    //que cumplan con tener letras, digitos y que tengas mas de 8 caracteres 
    else if (Password.length <= 8 || Password.search(/\w/)) {
        res.render('Login&Register',{
            alert: true,
            alertTitle: "Error",
            alertMessage: "¡su contraseña debe de tener al menos 8 caracteres, mayuscula, minuscula y numeros",
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
                .input("Nombre", sql.VarChar, Nombre)
                .input("ApellidoPa", sql.VarChar, ApellidoPa) 
                .input("ApellidoMa", sql.VarChar, ApellidoMa)
                .input("NumTel", sql.VarChar, NumTel)
                .input("Direccion", sql.VarChar, Direccion)
                .input("Sexo", sql.Char, Sexo)
                .input("Password", sql.VarChar, Password)
                .query(querys.addNewUsuario);
        res.render('Login&Register',{
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

export const Login = async (req, res) => {
    const { Nombre, Password } = req.body;
    //validacion
    if (Nombre == "" || Password == "") {
        res.render('Login&Register',{
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
            const result = await pool.request().query(querys.getAllTarifas);
            const Usuarios = await pool.request().query(querys.getAllUsuarios);
            const r=1;
            const rows = await pool
            .request()
            .input("Nombre", sql.VarChar, Nombre)
            .input("Password", sql.VarChar, Password)
            .query(querys.loginusuario);
            if (rows.recordset.length != "") {
                console.log(Nombre);
                res.render('UsuarioDefault',{
                    Usuarios,
                    Nombre,
                    result,
                    r,
                        alert: true,
                        alertTitle: "Has iniciado sesscion",
                        alertMessage: "!Login Exitoso¡",
                        alertIcon: 'success',
                        showConfirmButton:false,
                        timer:1500,
                        ruta:''
                });
            } else {
                res.render('Login&Register',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "!Cuenta no existente¡",
                    alertIcon: 'error',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:''
                });
            }
        } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};