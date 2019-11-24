const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db.js');
var productoController = require('./controllers/productoController.js');
var app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log('Inicio de servicio en el puerto: 3000'));

app.use('/productos', productoController);