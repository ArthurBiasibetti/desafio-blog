import { Router } from 'express';
import validate from '../../../middlewares/validateResource';
import { createUserSchema } from '../../../schemas/userSchemas';
import CreateUserController from '../../../useCases/createUser';

const routes = Router();

routes.post('/', validate(createUserSchema), (req, res, next) => {
  return CreateUserController.handle(req, res, next);
});

export default routes;
