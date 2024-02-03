import mongoose from 'mongoose';

//nombre de la coleccion
const productCollection = 'products';

//Scheme
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    reqired: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const productModel = mongoose.model(productCollection, productSchema);
