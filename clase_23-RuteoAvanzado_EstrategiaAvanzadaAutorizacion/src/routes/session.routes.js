import { Router } from './router.js'; //* Atencion acá. Nos estamos trayendo el router custom que creamos en el archivo router
import jwt from 'jsonwebtoken';

export default class SessionRouter extends Router {
  init() {
    this.post('/login', ['PUBLIC'], (req, res) => {
      const user = {
        email: req.body.email,
        role: req.body.role,
      };
      const token = jwt.sign(user, 'C0d3rh0us3');
      res.sendSuccess({ token });
    });

    this.get('/profile', ['USER', 'ADMIN'], (req, res) => {
      res.sendSuccess(req.user);
    });
  }
}
