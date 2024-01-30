import mongoose from 'mongoose';

//nombre de la coleccion
const estudianteCollection = 'estudiantes';

//esquema
//aqui se define como va a lucir nuestro registro de la base de datos

const estudianteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  curso: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  },
});

export const estudianteModel = mongoose.model(
  estudianteCollection,
  estudianteSchema
);
