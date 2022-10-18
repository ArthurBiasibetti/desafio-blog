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
import swaggerDocs from './config/swagger';

const corsOptions = {
  exposedHeaders: ['authorization', 'refresh'],
};

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.options('*', cors());

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  routes(app);

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      error: error.customObject || undefined,
    });
  });
});

export default app;
