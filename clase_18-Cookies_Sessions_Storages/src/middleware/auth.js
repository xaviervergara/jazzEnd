//middleware de autenticacion

export const auth = (req, res, next) => {
  const session = req.session;
  console.log({ session });
  if (
    req.session?.user === 'xaviervergara' &&
    req.session?.password === 'xv123'
  ) {
    return next();
  }
  res.status(401).send({ message: 'Unauthorized' });
};
