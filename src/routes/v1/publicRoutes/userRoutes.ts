import { Router } from 'express';
import CreateUserController from '../../../useCases/createUser';

const routes = Router();

routes.post('/', (req, res, next) => {
  return CreateUserController.handle(req, res, next);
});

export default routes;
