import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'C0d3rh0us3'; // los token necesitan una clave privada, no tiene que saberla nadie mas que los desarrolladores

//Funcion para generar el token

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
  return token;
};

//Funcion para descifrar el token

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Not authenticated' });
  }
  const token = authHeader.split(' ')[1]; // esto se hace porque el token viene en este formato: 'Bearer 14LKfwefm125351mMJOEfgO787y0HOi&8uGlh', asi nos quedamos solo con el token
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    // verificamos a ver si modificaron el token (al estar firmado, lo pueden cambiar, pero el servidor lo va a detectar)
    if (error) {
      return res.status(401).send({ message: 'Not authenticated' });
    }
    req.user = credentials;
    next();
  });
};
