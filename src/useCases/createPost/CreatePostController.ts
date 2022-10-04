import { NextFunction, Request, Response } from 'express';
import CreatePostUseCase from './CreatePostUseCase';
import logger from '../../config/logger';
import ICreatePostRequestDTO from './CreatePostRequestDTO';

export default class CreatePostController {
  constructor(private useCase: CreatePostUseCase) {}

  async handle(
    request: Request<{}, {}, ICreatePostRequestDTO, {}>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const data = request.body;
      const { user } = response.locals;

      const useCaseResult = await this.useCase.execute({
        ...data,
        userId: user.id,
      });

      return response.status(201).json(useCaseResult);
    } catch (error: any) {
      logger.error(`CreatePostController: ${error.message}`);
      return next(error);
    }
  }
}
