// Importar los módulos necesarios
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars').create();
const bodyparser = require('body-parser');
const routerApi =require('./routes');

// Crear una instancia de Express
const app = express();

//middlewares
app.use(bodyparser.json()); //para poder trabajar con json
app.use(bodyparser.urlencoded({ extended: true })); //para poder trabajar con formularios codificados en url
app.use(express.json()); //para poder trabajar con json
const router= express.Router();

// Configurar Express Handlebars como motor de plantillas predeterminado
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Configurar la carpeta de vistas
app.set('views', __dirname + '/views');

// Definir una ruta de ejemplo
app.get('/', (req, res) => {
    // Renderizar la vista 'home' y pasar datos a la plantilla
    res.render('home', {
        title: 'Mi aplicación Express con Handlebars',
        message: '¡Hola, mundo!'
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
routerApi(app);

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
})

module.exports=router;