require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id

const uri = process.env.URI;
const router = express.Router();

class citasJamesServices {
    constructor(){}

    // Buscar todas las citas

    async getCitas(){
        const cliente = new MongoClient(uri);

        try{
            await cliente.connect();
            const resultado = await cliente.db('Beautysoft').collection('citasJames').find({}).limit(10).toArray();
            return resultado;
        }
        catch(error){
            console.log(error);
        }
        finally{
            await cliente.close()
        }
    }

    //buscar una cita
    async buscarCita(id){
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const resultado =  await client.db('Beautysoft').collection('citasJames').findOne({_id: new ObjectId(id)});
            return resultado;
        } catch (e) {
            console.log(e);
        }finally{
            await client.close();
        }
    }

    //añadir una cita
async nuevaCita(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('citasJames').insertOne(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}

//nuevas citas
async nuevasCitas(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('citasJames').insertMany(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close();
    }
  }

  //DeletOne
async eliminarCita(id){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('citasJames').deleteOne({_id: new ObjectId(id)});
        return resultado;
    } 
    catch (e) {
        console.log(e);
    }
    finally{
        await client.close();
    }
  }


//Actualizar cita
async actualizarCitas(id,fecha,servicio){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('citasJames')
        .updateOne({_id: new ObjectId(id)},
        {
          $set:{
              fecha:fecha,
              servicio:servicio
          }});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
  }

//actualizar varias citas
async actualizarMuchasCitas(valor){
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Beautysoft').collection('citasJames').updateMany({},
       {
         $set:{valor:valor}
       })
       
  
     return resultado;
 
    } catch (error) {
     console.log(error);
    }finally{
      await cliente.close()
    }
  }


}


  


module.exports = citasJamesServices;