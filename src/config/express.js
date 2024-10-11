const express = require('express');
require('dotenv').config();
const cors = require('cors');
//const jwt = require("jsonwebtoken")
//const bodyParser = require('body-parser')
//const bcrypt = require('bcrypt');
const path = require('path');

const {
    seleccionRouter, sedeRouter, partidosRouter, resultadosRouter, jugadoresRouter, arbitrosRouter,
    directoresTecnicosRouter, usuariosRouter, noticiasRouter
} = require('../modules/controller/routes') //Acceso a los Routers

const app = express();

app.set("port", process.env.PORT || 3000); //Pone como puerto el Definido en el archivo .env o 3000
app.use(cors({ origins: "*" })) //Permite recibir cualquier peticion con X origen
app.use(express.json({ limit: '50mb' })); //Permite peticiones hasta 50mb

//Ruta principal de Inicio
app.get('/', (req, res) => {
    res.send("Servicio NodeJS - Copa Mundial de la FIFA 2023 ");
})
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//Endpoint's
app.use('/copa-mundial/selecciones', seleccionRouter);
app.use('/copa-mundial/sedes', sedeRouter);
app.use('/copa-mundial/partidos', partidosRouter);
app.use('/copa-mundial/resultados', resultadosRouter);
app.use('/copa-mundial/jugadores', jugadoresRouter);
app.use('/copa-mundial/arbitros', arbitrosRouter);
app.use('/copa-mundial/directoresTecnicos', directoresTecnicosRouter);
app.use('/copa-mundial/usuarios', usuariosRouter);
app.use('/copa-mundial/noticias', noticiasRouter);

module.exports = { app };