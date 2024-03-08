import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import passport from 'passport';
passport;
const sessionRoutes = Router();

//    ///////////////
//   ///Register////
//  ///////////////

//:failureRedirect: '/failregister': este segundo argumento nos dice donde vamos a redireccionar en caso de error. en ese caso redirecciona a la ruta //failregister

//  Ahora toda la logica la maneja PASSPORT y aca solo se pone el middleware
sessionRoutes.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/failregister' }),
  async (req, res) => {
    res.status(201).send({ message: 'User registered' });
  }
);

//    ///////////////
//   ////Login//////
//  ///////////////

sessionRoutes.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failogin' }),
  async (req, res) => {
    // ren req.user esta el usuario de que viene del serialized
    if (!req.user) {
      return res.status(400).send({ message: 'Error with credentials' });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
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

export default sessionRoutes;
