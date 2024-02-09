import express from 'express';

import mongoose from 'mongoose';
import { orderModel } from './models/order.model.js';

// instanciamos la app de express
const app = express();

const PORT = 8080;

// recibimos json
app.use(express.json());

// url extendida
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder'
);

///RUTAS///(PARA MAS AGILIDAD NO CREAMOS EMPLEAMOS ROUTER, LO HACEMOS ACA DIRECTAMENTE)

//EJERCICIO #1 -Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.

app.get('/api/orders', async (req, res) => {
  //aggregate: recibe un array que contiene todas las stages, cada stage se hace con una llave
  const orders = await orderModel.aggregate([
    {
      $match: { size: 'medium' },
    },
    {
      $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } }, // cada pizza se agrupa por nombre y suma las cantidades vendidas en cada orden de pizza mediana
    },
  ]);
  res.send({ orders });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
