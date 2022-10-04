import { Router } from 'express';
import CreateSessionController from '../../../useCases/createSession';

const routes = Router();

routes.post('/', (req, res, next) => {
  return CreateSessionController.handle(req, res, next);
});

export default routes;
