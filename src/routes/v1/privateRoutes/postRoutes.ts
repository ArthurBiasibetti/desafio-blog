import { Router } from 'express';
import authentication from '../../../middlewares/authentication';
import validate from '../../../middlewares/validateResource';
import { createPostSchema } from '../../../schemas/postSchemas';
import CreatePostController from '../../../useCases/createPost';
import SearchUserPostsController from '../../../useCases/searchUserPosts';

const routes = Router();

/**
 * @openapi
 * '/api/post/user':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a new post.
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: a171f890-ccda-4b43-b9e9-627ef23ac68a
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

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
