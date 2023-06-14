require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const citasJamesServices = require('../services/citasJamesServices');


const services = new citasJamesServices();

const uri = process.env.URI;

const router = express.Router();

//obtener todas las citas
router.get('/', async (req, res) => {
    const resultado = await services.getCitas();

    if(resultado.length >= 0){
        res.status(200).send(resultado);
    }
    else{
        res.status(400).send("No se han encontrado registros.")
    }
})

//buscar una cita
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await services.buscarCita(id);
    if(resultado){
        res.status(200).send(resultado);
    }
    else{
        res.status(404).send("No se encontraron registros");
    }
})

//añadir una cita
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevaCita(body);
        if(resultado){
            res.status(201).json({
                message: 'Cita creada exitosamente',
                resultado
            });
        }else{
            res.status(404).send("No se ha podido crear la cita");
        }
})

// crear varias citas
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevasCitas([body]);
        if(resultado){
            res.status(201).send('Se crearon las citas correctamente');
        }else{
            res.status(404).send("No se pudo crear ninguna cita");
        }
})

//Eliminar cita
router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.eliminarCita(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//Actualizar cita
router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    
    const fecha =req.body.fecha;
    const servicio =req.body.servicio;

        const resultado = await services.actualizarCita(id,fecha, servicio);
        if(resultado){
            res.status(201).json({
                message: 'Cita actualizada correctamente',
                resultado
            });
        }else{
            res.status(404).send("No se ha podido actualizar la cita");
        }
    
})

//Actualizar varias citas
router.patch('/',async (req, res)=>{
    const valor=req.body.valor;
    const resultado = await services.actualizarMuchasCitas(valor);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron las citas',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron las citas");
    }
}
)

module.exports=router;