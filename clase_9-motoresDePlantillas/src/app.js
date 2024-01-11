//importamos express
import express from 'express';

//importamos handlebars
import handlebars from 'express-handlebars';

//importamos viewsRoutes

import viewsRoutes from './routes/views.routes.js'; //acordarse del .js!!!!

//iniciamos el server
const app = express();

//puerto 8080
const PORT = 8080;

//podemos recibir json a traves de req
app.use(express.json());

//recibimos datos complejos a traves de la url
app.use(express.urlencoded({ extended: true }));

//definimos una carpeta publica
app.use(express.static('public'));

/////INICIO Handlebars//////

//definir cual va a ser el motor de plantillas
//vamos a setear un motor 'handlebars' y el motor va a ser handlebars.engine()
//(motor instanciado)
app.engine('handlebars', handlebars.engine());

//configurar donde van a estar las vistas
app.set('views', 'src/views');

//acá seteamos cual va a ser el motor de la vista
//decimos en realidad cual vamos a elegir, porque podemos tener
//otros configurados, pero aca seteamos cual de esos vamos a usar
app.set('view engine', 'handlebars');

/////FIN Handlebars//////

//configuramos la ruta raiz para el router viewsRoutes
app.use('/', viewsRoutes);

//app escuchando en puerto 8080
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
