import { Router } from 'express';
const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.render('views', {
    title: 'Chat app',
    style: 'index.css',
  });
});

export default viewsRouter;
