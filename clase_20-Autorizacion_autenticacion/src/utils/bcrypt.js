import bcrypt from 'bcrypt';

//HASHEAR PASS
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // genSaltSync: cantidad de veces que se encripta la pass. con 10 es suficiente

// COMPARAR PASS HASHEADA CON LA PASS QUE SE PASA POR EL FRONTEND
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password); // esta funcion devuelve un boolean.
