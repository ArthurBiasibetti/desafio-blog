import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import SearchPostsUseCase from './SearchUserPostsUseCase';

export default class SearchPostsController {
  constructor(private useCase: SearchPostsUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = response.locals;
      const posts = await this.useCase.execute(user);

      return response.status(200).json(posts);
    } catch (error: any) {
      logger.error(`SearchUserPostsController: ${error.message}`);
      return next(error);
    }
  }
}
