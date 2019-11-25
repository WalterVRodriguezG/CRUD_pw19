const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Producto} = require('../models/producto');

router.get('/', (req,res) => {
    Producto.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('Error en la Recuperación de Productos: ' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Registro no encontrado con el id: ${req.params.id}`);
        
    Producto.findById(req.params.id,(err,doc) => {
        if(!err){res.send(doc);}
        else{console.log('Error en la Recuperación del Producto: ' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/',(req,res) => {
    var prod = new Producto({
        idproducto: req.body.idproducto,
        nombre: req.body.nombre,
        presentacion: req.body.presentacion,
        lote: req.body.lote,
        preciounit: req.body.preciounit,
        idclase: req.body.idclase
    });
    prod.save((err,doc) => {
        if(!err){res.send(doc);}
        else{console.log('Error en el almacenamiento de Productos: ' + JSON.stringify(err, undefined, 2));}
    });

});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Registro no enontrado con el id: ${req.params.id}`);

    var prod = {
        idproducto: req.body.idproducto,
        nombre: req.body.nombre,
        presentacion: req.body.presentacion,
        lote: req.body.lote,
        preciounit: req.body.preciounit,
        idclase: req.body.idclase
    };

    Producto.findByIdAndUpdate(req.params.id,{$set:prod},{new:true},(err,doc) => {
        if(!err){res.send(doc);}
        else{console.log('Error en la Actualización del Producto: ' + JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay Registro con ese id: ${req.params.id}`);

    Producto.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){res.send(doc);}
        else{console.log('Error al Eliminar el Producto: ' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;