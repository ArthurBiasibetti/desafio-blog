import { Router } from 'express';
import validate from '../../../middlewares/validateResource';
import {
  // createUserSchema,
  searchUserSchema,
} from '../../../schemas/userSchemas';
// import CreateUserController from '../../../useCases/createUser';
import SearchUserController from '../../../useCases/searchUser';

const routes = Router();

// routes.post('/', validate(createUserSchema), (req, res, next) => {
//   return CreateUserController.handle(req, res, next);
// });

routes.get('/:id', validate(searchUserSchema), (req, res, next) => {
  return SearchUserController.handle(req, res, next);
});

export default routes;
