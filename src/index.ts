import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { ValidateError } from 'tsoa';
import swaggerUi from 'swagger-ui-express';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import { RegisterRoutes } from './routes/routes';

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

app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, error.fields);
      return res.status(422).json({
        message: 'Validation Failed',
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
