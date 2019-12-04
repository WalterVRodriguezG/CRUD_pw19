const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/crudInventario', (err)=> {
    if(!err)
        console.log('Conexión exitosa a MongoDB... ');
    else 
        console.log('Error en la conexión con la BD: '+ JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;