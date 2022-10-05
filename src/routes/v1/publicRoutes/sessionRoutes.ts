import { Router } from 'express';
import validate from '../../../middlewares/validateResource';
import { createSessionSchema } from '../../../schemas/sessionSchemas';
import CreateSessionController from '../../../useCases/createSession';

const routes = Router();

routes.post('/', validate(createSessionSchema), (req, res, next) => {
  return CreateSessionController.handle(req, res, next);
});

export default routes;
