require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const clientesJamesService = require('../services/clientesJamesService');

const services = new clientesJamesService();

const uri = process.env.URI;

const router = express.Router();

//get Clientes
router.get('/', async (req,res)=>{
    const resultado = await services.clientes();

    if(resultado.length>0){
        res.status(200).render('listarCliente', {
            result: resultado
        });
    }else{
        res.status(404).send('No encontró infromación');
    }
})

//filtrar cliente
router.post('/buscar', async (req, res)=>{
    const id = req.body.id;
        const resultado = await services.buscarCliente(id);
        if(resultado){
            res.status(200).render('buscarCliente', {
                result: resultado
            });
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//Nuevo estilista
router.get('/nuevo', async (req, res)=> {

    res.status(200).render('clienteNuevo');
})

router.post('/nuevo', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevoCliente(body);
        if(resultado){
            res.status(201).render('clienteCreado', {
                result: resultado
            });
        }else{
            res.status(404).send("No se creó el estilista");
        }
})

//ingresar varios Clientes
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.nuevosClientes(body);
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
router.get('/eliminar/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.eliminarCliente(id);
        if(resultado){
            res.status(200).redirect('/clientesJames')
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//actualizar estilista

router.get('/actualizar/:id', async (req, res)=>{
    const id = req.params.id;
    const resultado = await services.buscarCliente(id);
    if(resultado){
        res.status(200).render('clienteActualizar', {
            result: resultado
        });
    }else{
        res.status(404).send("No se encontro la información");
    }
})

router.post('/actualizarCliente', async (req, res)=>{
    const id = req.body.id;

    const nombre =req.body.nombre;
    const apellido =req.body.apellido;

        const resultado = await services.actualizarCliente(id,nombre, apellido);
        if(resultado){
            res.status(201).redirect('/clientesJames');
        }else{
            res.status(404).send("No se actualizó el estilista");
        }
    
})

//actualizar varios Clientes

router.patch('/',async (req, res)=>{
    const estado=req.body.estado;
    const resultado = await services.actualizarMuchos(estado);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron los Clientes',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron los Clientes");
    }
}
)

module.exports=router;