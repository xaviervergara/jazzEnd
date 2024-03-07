//CHEQUEAMOS SI EL USER ESTA LOGUEADO, DE LO CONTRARIO SE LO REDIRECCIONA A LA PAGINA LOGIN PARA QUE SE LOGUEE

export const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

//CHEQUEAMOS SI EL USUARIO ESTA LOGUEADO, DE SER ASI LO LLEVAMOS A LA PAGINA DE INICIO

export const checkExistingUser = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }

  next();
};
