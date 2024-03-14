import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import passport from 'passport';
import { generateToken } from '../config/jwt.config.js';
passport;
const sessionRoutes = Router();

//    ///////////////
//   ///Register////
//  ///////////////

//:failureRedirect: '/failregister': este segundo argumento nos dice donde vamos a redireccionar en caso de error. en ese caso redirecciona a la ruta //failregister

//  Ahora toda la logica la maneja PASSPORT y aca solo se pone el middleware
// sessionRoutes.post(
//   '/register',
//   passport.authenticate('register', { failureRedirect: '/failregister' }),
//   async (req, res) => {
//     res.status(201).send({ message: 'User registered' });
//   }
// );

//    /////////////////////
//   ////JWT REGISTER/////
//  /////////////////////

sessionRoutes.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(400).send({ message: 'User already exist' });
  }
  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password), // no olvidarse de hashear el pass que nos manda el user en cuando hace un registro!
  };

  await userModel.create(newUser);

  delete newUser.password;
  const accesToken = generateToken(newUser);

  res.status(201).send({ accesToken, message: 'Created' });
});

//    ///////////////
//   ////Login//////
//  ///////////////

// sessionRoutes.post(
//   '/login',
//   passport.authenticate('login', { failureRedirect: '/failogin' }),
//   async (req, res) => {
//     // ren req.user esta el usuario de que viene del serialized
//     if (!req.user) {
//       return res.status(400).send({ message: 'Error with credentials' });
//     }

//     req.session.user = {
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       age: req.user.age,
//       email: req.user.email,
//     };

//     res.redirect('/');
//   }
// );

//    /////////////////////
//   //////JWT LOGIN//////
//  /////////////////////

sessionRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user || !isValidPassword(user, password)) {
      return res.status(401).send({ message: 'Not authorized' }); // podriamos ser mas especificos a la hora de comunicarle al usuario cual es la credencial que esta mal,(usuario o pass), pero es preferible no dar tanta pista por si detras de eso hay un hacker
    }
    user.password = ''; // evitamos de que la password (aunque esta hasheada) venga en el token (esto siempre antes de generar el token!)
    const accesToken = generateToken(user);
    res.send({ status: 'Success', accesToken });
  } catch (error) {}
});

//    ///////////////
//   ////Logout/////
//  ///////////////

sessionRoutes.post('/logout', async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
    });
    res.send({ redirect: 'http://localhost:8080/login' }); // la redireccion la mandamos para que la maneje el frontend
  } catch (error) {
    res.status(400).send({ error });
  }
});

//    ////////////////////
//   ////Restore-Pass////
//  ////////////////////

sessionRoutes.post('/restore-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    user.password = createHash(password);
    await user.save();
    res.send({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error });
  }
});

//    /////////////////////
//   ////Git-hub login////
//  /////////////////////

sessionRoutes.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }), // el scope nos dice que el nombre de usuario va a ser el email
  (req, res) => {}
); //cuando se pase este middleware, se pasa directamente al get que tenemos abajo

sessionRoutes.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
    // console.dir(req.session, { depth: null });
  }
);

export default sessionRoutes;
