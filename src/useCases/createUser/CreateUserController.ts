import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import { ICreateUserRequestDTO } from './CreateUserRequestDTO';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  async handle(
    request: Request<{}, {}, ICreateUserRequestDTO, {}>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const data = request.body;
      const useCaseResult = await this.useCase.execute(data);

      return response.status(201).json(useCaseResult);
    } catch (error: any) {
      logger.error(`CreateUserController: ${error.message}`);
      return next(error);
    }
  }
}
