import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { ValidateError } from 'tsoa';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import { RegisterRoutes } from './routes/routes';
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

RegisterRoutes(app);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidateError) {
      console.log(error);
      console.warn(`Caught Validation Error for ${req.path}:`, error.fields);
      return res.status(error.status).json({
        message: 'VALIDATION_FAILED',
        details: error?.fields,
      });
    }

    return res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
      error: error.customObject || undefined,
    });

    next();
  });
});

export default app;
