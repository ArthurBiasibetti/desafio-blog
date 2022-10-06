import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import SearchUserUseCase from './SearchUserUseCase';

export default class SearchPostsController {
  constructor(private useCase: SearchUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const posts = await this.useCase.execute({ id });

      return response.status(200).json(posts);
    } catch (error: any) {
      logger.error(`SearchPostsController: ${error.message}`);
      return next(error);
    }
  }
}
