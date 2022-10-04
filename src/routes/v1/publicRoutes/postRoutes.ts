import { Router } from 'express';
import SearchPostsController from '../../../useCases/searchPosts';

const routes = Router();

routes.get('/', (req, res, next) => {
  return SearchPostsController.handle(req, res, next);
});

export default routes;
