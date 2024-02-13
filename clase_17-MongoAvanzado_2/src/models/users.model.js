import mongoose from 'mongoose';

//Plugin de mongoose que facilita la paginacion
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: String,
  email: String,
  gender: String,
});

//a traves de este middleware, le agregamos la funcionalidad mongoosePaginate al schema

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);
