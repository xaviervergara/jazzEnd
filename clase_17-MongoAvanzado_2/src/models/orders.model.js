import mongoose from 'mongoose';

const orderCollection = 'orders';

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large'], //definimos las opciones. fuera de esto tira un error de validacion
    default: 'medium', //si no se especifica, el valor por defecto es medium
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const orderModel = mongoose.model(orderCollection, orderSchema);
