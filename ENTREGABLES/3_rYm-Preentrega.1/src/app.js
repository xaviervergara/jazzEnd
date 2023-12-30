//importamos express
const express = require('express');
//Importamos productsRouter
const productsRouter = require('./routes/products.routes.js');

//Escuchando en puerto 8080
const PORT = 8080;

//Iniciamos la app
const app = express();

//recibimos json
app.use(express.json());

//configuracion url
app.use(express.urlencoded({ extended: true }));

//montaje enrutador products
app.use('/api/products', productsRouter);

//Server corriendo desde 8080
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
