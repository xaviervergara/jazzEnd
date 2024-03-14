import { Router } from 'express';
import { userModel } from '../DAO/models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcyrpt.js';
import passport from 'passport';

const sessionRoutes = Router();

//    ///////////////
//   ///Register////
//  ///////////////

sessionRoutes.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/failregister' }),
  async (req, res) => {
    // res.status(201).send({ message: 'User registered' });

    req.session.user = req.user;

    return res.redirect('/products');
  }
);

//    ///////////////
//   ////Login//////
//  ///////////////

sessionRoutes.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failogin' }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).send({ message: 'Error with credentials' });
    }

    // le pasamos el usuario a la session

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    res.redirect('/');
  }
);

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
    res.redirect('/products');
    // console.dir(req.session, { depth: null });
  }
);

export default sessionRoutes;
