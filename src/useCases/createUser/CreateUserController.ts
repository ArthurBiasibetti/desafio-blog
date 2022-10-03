import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const data = request.body;
      const useCaseResult = await this.useCase.execute(data);

      return response.status(201).send(useCaseResult);
    } catch (error: any) {
      logger.error(`GetResumesController: ${error.message}`);
      return next(error);
    }
  }
}
