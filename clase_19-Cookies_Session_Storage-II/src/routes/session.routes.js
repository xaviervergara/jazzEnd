import { Router } from 'express';
import { userModel } from '../models/user.model.js';

const sessionRoutes = Router();

//    ///////////////
//   ///Register////
//  ///////////////

sessionRoutes.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.send({ message: 'Missing fields' });
  }
  try {
    const user = await userModel.create({
      //registramos el user, es decir, lo guardamos en la bd
      first_name,
      last_name,
      email,
      age,
      password,
    });

    req.session.user = user; //agregamos el usuario a la sesion, es decir, se registra y lo logueamos para que inicie sesion
    res.redirect('/'); //luego, redireccionamos a la pagina principal
  } catch (error) {
    console.error(error);
    res.status(400).send({ error });
  }
});

//    ///////////////
//   ////Login//////
//  ///////////////

sessionRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); //buscamos por email ya que este tiene la caracteristica de ser unico
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    req.session.user = user; //guardamos en la session el usuario encontrado
    res.redirect('/'); //el mismo navegador redirecciona automaticamente (se redirecciona desde el server)
  } catch (error) {
    res.status(400).send({ error });
  }
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

export default sessionRoutes;
