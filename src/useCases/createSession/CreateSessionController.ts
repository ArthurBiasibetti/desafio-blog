import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import ICreateSessionDTO from './CreateSessionDTO';
import CreateSessionUseCase from './CreateSessionUseCase';

export default class CreateSessionController {
  constructor(private useCase: CreateSessionUseCase) {}

  async handle(
    request: Request<{}, {}, ICreateSessionDTO, {}>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const data = request.body;
      const sessionData = await this.useCase.execute(data);

      response.set('authorization', sessionData.token);
      return response.status(201).json(sessionData.user);
    } catch (error: any) {
      logger.error(`CreateSessionController: ${error.message}`);
      return next(error);
    }
  }
}
