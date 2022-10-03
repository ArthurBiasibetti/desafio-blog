import { Express, Request, Response } from 'express';
import userRoutes from './v1/publicRoutes/userRoutes';

function routes(app: Express) {
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/api/user', userRoutes);
}

export default routes;
