const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('./db.js');
const app = express();

var productoController = require('./controllers/productoController.js');

app.use(bodyParser.json());


app.use(cors());

app.listen(3000, () => console.log('Inicio de servicio en el puerto: 3000'));

app.use('/productos', productoController);

module.exports = app;