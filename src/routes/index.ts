import { Express, Request, Response } from 'express';
import userPublicRoutes from './v1/publicRoutes/userRoutes';
import sessionRoutes from './v1/publicRoutes/sessionRoutes';
import categoryPrivateRoutes from './v1/privateRoutes/categoryRoutes';
import postPrivateRoutes from './v1/privateRoutes/postRoutes';
import postPublicRoutes from './v1/publicRoutes/postRoutes';

function routes(app: Express) {
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/api/user', userPublicRoutes);
  app.use('/api/user/session', sessionRoutes);
  app.use('/api/user/post', postPrivateRoutes);
  app.use('/api/post', postPublicRoutes);
  app.use('/api/category', categoryPrivateRoutes);
}

export default routes;
