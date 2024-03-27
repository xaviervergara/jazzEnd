import { Router as ExpressRouter } from 'express';
import jwt from 'jsonwebtoken';

export class Router {
  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  //* ApplyCallbacks

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => {
      return async (...params) => {
        try {
          await callback.apply(this, params);
        } catch (error) {
          console.log(error);
          params[1].status(500).send(error); //* Equivale a decir res.status ya que los params vienen primero -req, res y next
        }
      };
    });
  }

  //* HandlePolicies

  handlePolicies = (policies) => (req, res, next) => {
    if (policies.find((p) => p === 'PUBLIC')) {
      return next();
    }

    const authHeaders = req.headers.authorization; //* Obtener los headers que nos pasan a traves de json web token
    const token = authHeaders.split(' ')[1];
    const user = jwt.verify(token, 'C0d3rh0us3');
    if (!policies.includes(user.role.toUpperCase())) {
      return res.status(403).send({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  };

  //* GetRouter

  getRouter() {
    return this.router;
  }

  //* Init

  init() {}

  //* Get

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies), //* Siempre se verifica al principio si se tiene permisos o no
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  //* Post

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  //* Put

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  //* Delete

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  //* GenerateCustomResponses

  generateCustomResponses(req, res, next) {
    res.sendSuccess = (payload) => res.send({ status: 'success', payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: 'error', error });
    res.sendUserError = (error) =>
      res.status(400).send({ status: 'error', error });
    next(); //! Recordar siempre esta linea cuando codeamos middlewares
  }
}
