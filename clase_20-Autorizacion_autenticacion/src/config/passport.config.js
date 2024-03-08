import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';

// PASSPORT NOS SIRVE PARA CENTRALIZAR TODA LA LOGICA DE AUTENTICACIONES, (EN UN SITIO GRANDE HAY MAS DE UN TIPO DE AUTENTICACION)
// HACIENDO QUE QUEDE TODO EN ESTE ARCHIVO Y SE MANEJE TODO DESDE AQUI AHORRANDONOS TENER QUE HACER LA LOGICA EN CADA ENDPOINT ;)

//inicializar estrategia

const LocalStrategy = local.Strategy;

//inicializar passport
//:passReqToCallback: para poder acceder al obj request desde passport
//:usernameField: 'email': configuramos nuestra varaible email, para que sea esta la que funcione como identificador "username" en passport
//Luego aqui=>>  async (req, username, password, done) => {... , email se convierte en "username"

const initializePassport = () => {
  //REGISTER
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log('User already exist'); // actualmente en nuestro programa esta validacion ya esta hecha en el modelo, al tener seteado el email como "unique" no permitiendo dos usuarios iguales
            return done(null, false); //primer arg es un error, si no tenemos mandamos null, para poder hacer uso del segundo arg en el cual va el user. en este caso, como el user ya esta registrado lo ponemos en false para que no se vuelva a regsitrar
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done('Error to obtain the user ' + error); // aca se puede ver como hacemos uso del primer parametro de done el cual es un error
        }
      }
    )
  ); //register con estrategia local

  //LOGIN

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log('User does not exist');
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //SERIALIZE
  passport.serializeUser((user, done) => {
    done(null, user._id); //serializa el user que coincida con el del _id que se le esta pasando
  });

  //DESERIALIZE

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id });

    done(null, user); //user es lo que se va a deserealizar//PARA MAS INFORMACION CONSULTAR LA DOCU OFICIAL DE PASSPORT
  });
};

export default initializePassport;
