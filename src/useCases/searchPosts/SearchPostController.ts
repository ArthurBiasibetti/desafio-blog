import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import SearchPostsUseCase from './SearchPostsUseCase';

export default class SearchPostsController {
  constructor(private useCase: SearchPostsUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const posts = await this.useCase.execute();

      return response.status(200).json(posts);
    } catch (error: any) {
      logger.error(`SearchPostsController: ${error.message}`);
      return next(error);
    }
  }
}
