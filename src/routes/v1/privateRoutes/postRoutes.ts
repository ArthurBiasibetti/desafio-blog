import { Router } from 'express';
import authentication from '../../../middlewares/authentication';
import CreatePostController from '../../../useCases/createPost';

const routes = Router();

routes.post('/', authentication, (req, res, next) => {
  return CreatePostController.handle(req, res, next);
});

export default routes;
