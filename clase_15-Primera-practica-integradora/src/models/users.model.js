import mongoose from 'mongoose';

//configuramos el nombre de la coleccion
const userCollection = 'users';

//Creamos el esquema mdodelo
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birth_date: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    //enum sirve para limitar entre los valores que demos como opcion en el array
    enum: ['M', 'F'],
  },
  imagePath: String,
});

//primero va el nombre de la coleccion y luego el esquema
export const userModel = mongoose.model(userCollection, userSchema);
