require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id

const uri = process.env.URI;

const router = express.Router();

class estilistasJamesService{

    constructor (){}

    //obtener todos los estilistas
    async estilistas(){
        const cliente = new MongoClient(uri);
        try {
          await cliente.connect();
          const resultado = await cliente.db('Beautysoft').collection('estilistasJames').find({}).limit(10).toArray();
          return resultado;
          
        } catch (error) {
          console.log(error);
        }finally{
          await cliente.close()
        }
      }

 //buscar un estilista
async buscarEstilista(id){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('estilistasJames').findOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
}

//Añadir un estilista
async nuevoEstilista(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('estilistasJames').insertOne(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}

//InsertMany

async nuevosEstilistas(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('estilistasJames').insertMany(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
  
  }

  //DeletOne
async eliminarEstilista(id){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('estilistasJames').deleteOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
  }

  //UPDATEONE

async actualizarEstilista(id,nombre,apellido){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('estilistasJames').updateOne({_id: new ObjectId(id)},
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
      const resultado = await cliente.db('Beautysoft').collection('estilistasJames').updateMany({},
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

module.exports = estilistasJamesService;