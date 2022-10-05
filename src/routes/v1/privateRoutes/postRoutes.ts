import { Router } from 'express';
import authentication from '../../../middlewares/authentication';
import validate from '../../../middlewares/validateResource';
import { createPostSchema } from '../../../schemas/postSchemas';
import CreatePostController from '../../../useCases/createPost';
import SearchUserPostsController from '../../../useCases/searchUserPosts';

const routes = Router();

routes.post(
  '/',
  authentication,
  validate(createPostSchema),
  (req, res, next) => {
    return CreatePostController.handle(req, res, next);
  }
);

routes.get('/', authentication, (req, res, next) => {
  return SearchUserPostsController.handle(req, res, next);
});

export default routes;
