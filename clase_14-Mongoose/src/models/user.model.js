import mongoose from 'mongoose';

//Nombre de la coleccion
const userCollection = 'usuarios';

//esquema
//aqui se define como va a lucir nuestro registro de la base de datos
const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    //no se pueden repetir emails
    unique: true,
  },
});

//se exporta de esta manera: el nombre de la coleccion y el esquema
export const userModel = mongoose.model(userCollection, userSchema);
