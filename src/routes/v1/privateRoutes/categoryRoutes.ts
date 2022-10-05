import { Router } from 'express';
import adminAuthentication from '../../../middlewares/adminAuthentication';
import authentication from '../../../middlewares/authentication';
import validate from '../../../middlewares/validateResource';
import { createCategorySchema } from '../../../schemas/categorySchemas';
import CreateCategoryController from '../../../useCases/createCategory';
import SearchCategoryController from '../../../useCases/searchCategory';

const routes = Router();

routes.post(
  '/',
  authentication,
  adminAuthentication,
  validate(createCategorySchema),
  (req, res, next) => {
    return CreateCategoryController.handle(req, res, next);
  }
);

routes.get('/', authentication, (req, res, next) => {
  return SearchCategoryController.handle(req, res, next);
});

export default routes;
