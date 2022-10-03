import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import routes from './routes';
import deserializeUser from './middlewares/deserializeUser';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(deserializeUser);

routes(app);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message,
    error: error.customObject || undefined,
  });
});

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();
});

export default app;
