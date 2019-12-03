const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//var redis = require('redis');
//const client = redis.createClient('redis://redis:6379')

var {Producto} = require('../models/producto');

router.get('/', (req,res) =>{
    /*  var redis_id = 1;
    client.get(redis_id, (err,docs)=>{
        if(err) { console.log('Error while retrieving the data from redis!: ' + err); }
        if(docs){
            console.log('Ya existe en redis.');
            res.status(200).send(JSON.parse(docs));
        }
        else{
            console.log('No existe en redis!');
            */
            Producto.find((err,docs) =>{ 
                if(!err){
                 //   client.setex(redis_id, 30, JSON.stringify(docs));
                    console.log('Response ingresado a redis!')
                    res.status(200).send(docs);                   
                }
                else{ console.log("ERROR: Couldn't retrive data from database :" + JSON.stringify(err,undefined,2)); }
            //});
       // }

    });
    
});

router.get('/:id',(req,res) =>{
    /*  client.get(req.params.id, (err, doc) =>{
        if(err) { console.log('Error while retrieving the data from Redis: ' + err);}
        if(doc){
            console.log('Existe en redis!');
            res.status(200).send(JSON.parse(doc));
        }
        else{
            console.log('No existe en redis!') */
            Producto.findById(req.params.id, (err,doc) =>{
                if(!err){ 
                    //client.setex(req.params.id, 30, JSON.stringify(doc));
                    console.log('Response ingresado a redis!')
                    res.status(200).send(doc);
                 }
                 else { res.status(404).send(`No information found with the provided id : ${req.params.id}`); }
          //  });
       // }

            console.log('No existe en redis!')
            Producto.findById(req.params.id,(err,doc) => {
                if(!err){
                    client.setex(req.params.id, 30, JSON.stringify(doc));
                    console.log('Response ingresado a redis!')
                    res.status(200).send(doc);
                }
                else { res.status(404).send(`No information found with the provided id : ${req.params.id}`); }
            });
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