require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id

const uri = process.env.URI;

const router = express.Router();

class clientesJamesService{

    constructor (){};

        //obtener todos los clientes
        async clientes(){
            const cliente = new MongoClient(uri);
            try {
              await cliente.connect();
              const resultado = await cliente.db('Beautysoft').collection('clientesJames').find({}).limit(10).toArray();
              return resultado;
              
            } catch (error) {
              console.log(error);
            }finally{
              await cliente.close()
            }
          }

          //buscar un Cliente
async buscarCliente(id){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('clientesJames').findOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
}

//Añadir un Cliente
async nuevoCliente(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('clientesJames').insertOne(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}

//InsertMany

async nuevosClientes(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('clientesJames').insertMany(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
  
  }

  //DeletOne
async eliminarCliente(id){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('clientesJames').deleteOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
  }

  //UPDATEONE

async actualizarCliente(id,nombre,apellido){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('clientesJames').updateOne({_id: new ObjectId(id)},
        {
          $set:{
              nombre:nombre,
              apellido:apellido
          }});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
  }

  //UpdateMany

async actualizarMuchos(estado){
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Beautysoft').collection('clientesJames').updateMany({},
       {
         $set:{estado:estado}
       })
       
  
     return resultado;
 
    } catch (error) {
     console.log(error);
    }finally{
      await cliente.close()
    }
  }

}

module.exports = clientesJamesService;