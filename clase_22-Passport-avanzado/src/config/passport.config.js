import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'; //el as se hace para el caso de cuando tenemos varias estrategias poder diferenciarlas unas de otras
import { tokenSecret } from '../utils/constants.js';
//NO ASUSTARSE CON TODO ESTE CODIGO: ES SIMPLEMENTE LA CONFIGURACION DE UNA LIBRERIA EXTERNA. SI SE QUIERE SABER MAS, SE AGARRA LA DOCUMENTACION Y SE ESTUDIA

//funcion para extraer el jwt de las cookies

const cookieExtractor = (req) => {
  let token = null;

  if (req) {
    token = req.cookies['coderCookieToken']; // SI esxiste una solicitud(req), se busca la cookie que se le pasa por nombre y se extrae el token de la misma
  }
  return token;
};
//INITIALIZE PASSPORT
const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // aqui se aplica la funcion que extrae el token de la cookie
        secretOrKey: tokenSecret, //aca passport verifica la validez del token utilizando la clave secreta que le pasamos
      },
      async (jwt_payLoad, done) => {
        try {
          //console.table(jwt_payolad)=> ese es el objeto que tiene {email, password, iat, exp} es lo que esta codificado en el token
          return done(null, jwt_payLoad); //Aqui passport decodifica el jwt y los datos los almacena en jwt_payload
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
