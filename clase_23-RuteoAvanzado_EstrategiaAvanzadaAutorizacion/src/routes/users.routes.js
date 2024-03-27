import { Router } from './router.js';

export default class UserRouter extends Router {
  init() {
    this.get('/', ['PUBLIC'], (req, res) => {
      res.sendSuccess('Hola como estan?');
    });
  }
}
