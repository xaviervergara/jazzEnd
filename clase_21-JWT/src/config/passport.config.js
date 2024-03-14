import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { Strategy as GithubStrategy } from 'passport-github2';

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
      { passReqToCallback: true, usernameField: 'email' }, //este callback de 2 argumentos se lo conoce como callback de autenticacion
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
          return done(null, user); //una vez que pasa el usuario, se va req, y se va con el nombre que le hayamos puesto en este done(), en este caso "user" de modo que = req.user
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //LOGIN GITHUB

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.3789cee2521a5f6c',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        clientSecret: '2b882cc1aa2c7bee25eb43732d0a97941feaa759',
      }, //chequear docu oficial de passport-github2
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log({ profile });

          const user = await userModel.findOne({ email: profile._json.email }); //profile viene de github, dentro tiene el obj "_json" y dentro de este tiene el email
          if (!user) {
            const newUser = {
              first_name: profile._json.name.split(' ')[0], //divimos por espacio, nos quedamos con nombre [0] y apellido [1] si tiene mas de un nombre cagamos. otra solucion es sacar el required del campo last_name en el model, que de hecho hicimos eso porque si no tiene apellido tambien cagamos
              last_name: profile._json.name.split(' ')[1], //last name no viene en github, el nombre viene todo entero en 'profile._json.name'
              age: 18, //age no viene en github, aqui ponemos un random porque no es de relevancia
              email: profile._json.email, // en este caso cada usuario deberia configurar su email en github para que aparezca como publico. otra forma es que en vez de que se logueen con el email lo hagan con el username(email: profile.username)(siempre consologuear profile para ver como vienen los datos!)
              password: 'GithubGenerated', // no viene en github, ponemos "GithubGenerated" para tener de referencia de que se inicio sesion con github
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          }
          return done(null, user); // aqui si el usuario ya existe se lo pasamos. Este es el user que obtuvimos del userModel.findOne({ email: profile._json.email })
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //SERIALIZE
  passport.serializeUser((user, done) => {
    //aqui user llega a traves del output del login el cual se da en el done(null, user)
    done(null, user._id); //serializa el user utilizando su propio id unico. si el id de un usuario fuese "123", este quedaria serializado a "123"
  });

  //DESERIALIZE

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id });

    done(null, user); //user es lo que se va a deserealizar//PARA MAS INFORMACION CONSULTAR LA DOCU OFICIAL DE PASSPORT
  });
};

export default initializePassport;
