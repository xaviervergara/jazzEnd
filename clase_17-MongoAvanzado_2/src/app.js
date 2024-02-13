import express from 'express';

import handlebars from 'express-handlebars';

import mongoose from 'mongoose';
import { orderModel } from './models/orders.model.js';
import { studentModel } from './models/estudiantes.model.js';
import { userModel } from './models/users.model.js';
import viewsRoutes from './router/views.routes.js';

// instanciamos la app de express
const app = express();

const PORT = 8080;

// recibimos json
app.use(express.json());

// url extendida
app.use(express.urlencoded({ extended: true }));

//////HANDLEABARS//////
//CONFIG ADICIONAL HANDLEBARS (SOLO PORQUE TAMBIEN ESTA INSTALADO MONGOOSE)
//hbs = handlebars (abreviacion)
const hbs = handlebars.create({
  //Crea un nuevo handlebars engine con la opcion "runtimeOptions" que permite envio de propiedades como prototipos
  runtimeOptions: {
    allowProtoPropertiesByDefault: true, // Permite pasar props que se consideran prototipos (mongoose tiene estas propiedades que son consideradas como tales. De esta manera nos aseguramos de que handlebars las interprete como tal y las deje pasar)
  },
});

app.engine('handlebars', hbs.engine); //Por lo general el segundo arg es handlebars.engine()

app.set('views', 'src/views');

app.set('view engine', 'handlebars');
//////FIN HANDLEBARS//////

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder'
);

///RUTAS///(PARA MAS AGILIDAD NO CREAMOS EMPLEAMOS ROUTER, LO HACEMOS ACA DIRECTAMENTE)
//Ahora si usamos router para el ejercicio final, porque este archivo ya se hizo muy largo

app.use('/', viewsRoutes);

//EJERCICIO #1 -Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.

app.get('/api/orders/', async (req, res) => {
  //dinamizamos con query param
  const { providedSize } = req.query;
  //aggregate: recibe un array que contiene todas las stages, cada stage se hace con una llave
  const orders = await orderModel.aggregate([
    {
      $match: { size: providedSize },
    },
    {
      $group: {
        _id: '$name',
        totalQuantity: { $sum: '$quantity' },
        size: { $first: '$size' },
      }, // cada pizza se agrupa por nombre y suma las cantidades vendidas en cada orden de pizza mediana, $first nos sirve para imprimir el dato del tamaño en este caso, que es una string
    },
    { $sort: { totalQuantity: -1 } },
    {
      $group: {
        _id: 1,
        orders: { $push: '$$ROOT' },
      },
    }, //$PUSH ROOT, METE EN ORDERS TODO LO QUE HABIA EN LA CONSULTA ANTERIOR, OSEA TODO EL GRUPO
    {
      $project: {
        _id: 0, //al poner 0, mongo auto-genera un Id unico
        orders: '$orders',
      },
    },
    {
      $merge: {
        into: 'reports',
      },
    },
  ]);

  res.send({ message: 'Report generated' });
});

//EJERCICIO #2
app.get('/api/students', async (req, res) => {
  const students = await studentModel.aggregate([
    {
      $sort: { grade: -1 },
    },
    {
      $group: {
        _id: '$group',
        estudiantes: { $push: '$$ROOT' },
        promedio_mujeres: {
          //average
          $avg: {
            //condicion
            $cond: {
              if: { $eq: ['$gender', 'Female'] }, //$operator: ['key'/'value']
              then: '$grade', //then= si coincide, prooveemos el grade para que se calcule el avg
              else: null, //si no coincide le mandamos null para que no haga nada
            },
          },
        },
        promedio_varones: {
          //average
          $avg: {
            //condicion
            $cond: {
              if: { $eq: ['$gender', 'Male'] }, //$operator: ['key'/'value']
              then: '$grade', //then= si coincide, prooveemos el grade para que se calcule el avg
              else: null, //si no coincide le mandamos null para que no haga nada
            },
          },
        },
        promedio_total: { $avg: '$grade' },
      },
    },
    {
      $group: {
        _id: 0,
        grupos: { $push: '$$ROOT' }, //Mete el input anterior en un nuevo array "grupos", la estructura de este obj queda: obj: Id: 'x', grupos: [imput anterior], promedio general: x
        promedio_general: { $avg: '$promedio_total' }, // Se agrupa para poder tomar el valor "promedio_total" del input anterior, y hacer el promedio general a patir de eso
      },
    },
  ]);
  res.send({ students });
});

// PAGINATION
app.get('/api/users', async (req, res) => {
  const users = await userModel.paginate(
    {
      gender: 'Female', //Filtramos la busqueda
    },
    {
      limit: 20, //simplemente decimos cuantos docs tendra la page
      page: 1, //Nos posiconamos sobre una page
    }
  );
  res.send({ users });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
