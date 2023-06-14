const routerCitas=require('./routesCitas');
const routerServicios=require('./routesServicios');
const routerEstilistas=require('./routesEstilistas');
const routerCitasJames = require('./routesCitasJames');
const routerEstilistasJames = require('./routesEstilistasJames');
const routerClientesJames = require('./routesClientesJames');

function routerApi(app){
    app.use('/citasJhon', routerCitas),
    app.use('/serviciosJhon',routerServicios);
    app.use('/estilistaJhon',routerEstilistas);
    app.use('/citasJames', routerCitasJames);
    app.use('/estilistasJames', routerEstilistasJames);
    app.use('/clientesjames', routerClientesJames);
       
}

module.exports =routerApi;
