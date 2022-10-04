import { Router } from 'express';
import adminAuthentication from '../../../middlewares/adminAuthentication';
import authentication from '../../../middlewares/authentication';
import CreateCategoryController from '../../../useCases/createCategory';
import SearchCategoryController from '../../../useCases/searchCategory';

const routes = Router();

routes.post('/', authentication, adminAuthentication, (req, res, next) => {
  return CreateCategoryController.handle(req, res, next);
});

routes.get('/', authentication, (req, res, next) => {
  return SearchCategoryController.handle(req, res, next);
});

export default routes;
