const mongoose = require('mongoose');
var Producto = mongoose.model('Producto', {
    idproducto : {type: Number},
    nombre: {type: String},
    presentacion: {type: String},
    lote: {type: String},
    preciounit: {type: Number},
    idclase: {type: Number}
}); 

module.exports = {Producto};