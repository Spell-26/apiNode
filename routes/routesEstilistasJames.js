require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const estilistasJamesService = require('../services/estilistasJamesService');

const services =new estilistasJamesService();


const uri = process.env.URI;

const router = express.Router();

//get estilistas
router.get('/', async (req,res)=>{
    const resultado = await services.estilistas();

    if(resultado.length>0){
        res.status(200).send(resultado);
    }else{
        res.status(404).send('No encontró infromación');
    }
})

//filtrar estilista
router.get('/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.buscarEstilista(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//Nuevo estilista
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevoEstilista(body);
        if(resultado){
            res.status(201).json({
                message: 'Se creo el estilista',
                resultado
            });
        }else{
            res.status(404).send("No se creó el estilista");
        }
})

//ingresar varios estilistas
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevosEstilistas(body);
        if(resultado){
            res.status(201).json({
                message: 'Se creo los estilista',
                resultado
            });
        }else{
            res.status(404).send("No se creó el estilista");
        }
})

//eliminar estilista
router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.eliminarEstilista(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//actualizar estilista
router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    
    const nombre =req.body.nombre;
    const apellido =req.body.apellido;

        const resultado = await services.actualizarEstilista(id,nombre, apellido);
        if(resultado){
            res.status(201).json({
                message: 'Se actualizó el estilista',
                resultado
            });
        }else{
            res.status(404).send("No se actualizó el estilista");
        }
    
})

//actualizar varios estilistas

router.patch('/',async (req, res)=>{
    const estado=req.body.estado;
    const resultado = await services.actualizarMuchos(estado);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron los estilistas',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron los estilistas");
    }
}
)

module.exports=router;