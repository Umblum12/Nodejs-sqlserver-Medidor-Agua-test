import app from "../src/app";
import request from "supertest";

describe(' Get Login&Register test',() =>{
    test('debe responder con un codigo de estado 200', async()=>{
        const response = await request(app).get("/Login&Register").send();
        expect(response.statusCode).toBe(200);

    });
});

describe(' Post Login test',() =>{ 
    test('debe responder con un codigo de estado 200', async()=>{
        const response = await request(app).post("/Login").send();
        expect(response.statusCode).toBe(200);
    });
});

describe('Integration tests for the Tarifas API', () => {
    test('debe tener tarifas', async()=>{ 
        const response = await request(app).get("/InformacionTHUsuarioDefault").send();
        expect(response.body.Tarifas);
    });
    test('debe tener un objeto', async()=>{
        const response = await request(app).get("/InformacionTHUsuarioDefault").send();
        expect(response.body).toBeInstanceOf(Object);
    });

    test('debe Registrar un usuario', async()=>{
        const response = await request(app).post("/Registrar").send({
              Nombre:"Eduardo",
                ApellidoPa: "sergio",
                ApellidoMa: "sunim",
                NumTel: "6441",
                Direccion: "los ckracks",
                Sexo: "HM",
                Password: "Abelardo123456789",
                Password2: "Abelardo123456789",
            });
            expect(response.statusCode).toBe(200);
    });

    test('Debe Eliminar un usuario Registrado', async()=>{
        const ID = 69;
        const response = await request(app).get('/Configuracion/Eliminar/'+ID).send();
            expect(response.statusCode).toBe(302);
    });
});





    describe(' tests for the Tarifas API and video ', () => {
    /* Test video */

    test('el campo apellido materno no acepta números y símbolos', async()=>{
        const response = await request(app).post("/Registrar").send({
            Nombre:"Eduardo",
              ApellidoPa: "sergio",
              ApellidoMa: "Sanchez123#$",
              NumTel: "6441567676",
              Direccion: "los ckracks",
              Sexo: "H",
              Password: "Abelardo123456789",
              Password2: "Abelardo123456789",
          });
          expect(response.statusCode).toBe(300);
    });

    test('Registro de cliente (Campos completos)', async()=>{
        const response = await request(app).post("/Registrar").send({
            Nombre:"Eduardo",
              ApellidoPa: "sergio",
              ApellidoMa: "Sanchez",
              NumTel: "6441567676",
              Direccion: "los ckracks",
              Sexo: "H",
              Password: "Abelardo123456789",
              Password2: "Abelardo123456789",
          });
          expect(response.statusCode).toBe(200);
    });

    test('el campo sexo no acepta números y símbolos', async()=>{
        const response = await request(app).post("/Registrar").send({
            Nombre:"Eduardo",
              ApellidoPa: "sergio",
              ApellidoMa: "Sanchez",
              NumTel: "6441567676",
              Direccion: "los ckracks",
              Sexo: "H&%$#134567",
              Password: "Abelardo123456789",
              Password2: "Abelardo123456789",
          });
          expect(response.statusCode).toBe(300);
    });

    test(' Registro cliente con contraseñas diferentes ', async()=>{
        const response = await request(app).post("/Registrar").send({
            Nombre:"Eduardo",
              ApellidoPa: "sergio",
              ApellidoMa: "Sanchez",
              NumTel: "6441567676",
              Direccion: "los ckracks",
              Sexo: "H",
              Password: "Abelardo12",
              Password2: "Abelardo123456789",
          });
          expect(response.statusCode).toBe(300);
    });
});
