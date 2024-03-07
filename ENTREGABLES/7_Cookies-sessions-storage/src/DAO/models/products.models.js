//importamos mongoose
import mongoose from 'mongoose';

//importamos paginaete
import mongoosePaginate from 'mongoose-paginate-v2';

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
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
  available: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thubmnail: String,
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
