export const authorization = (role) => {
  return async (req, res, next) => {
    if (req.user.role !== 'user') {
      req.res.status(403).send({ error: 'No premissions' });
    }
    next();
  };
};
