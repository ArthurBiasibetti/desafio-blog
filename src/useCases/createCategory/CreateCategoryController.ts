import { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger';
import { ICreateCategoryRequestDTO } from './CreateCategoryRequestDTO';
import CreateCategoryUseCase from './CreateCategoryUseCase';

export default class CreateCategoryController {
  constructor(private useCase: CreateCategoryUseCase) {}

  public async handle(
    request: Request<{}, {}, ICreateCategoryRequestDTO, {}>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const data = request.body;
      const useCaseResult = await this.useCase.execute(data);

      return response.status(201).json(useCaseResult);
    } catch (error: any) {
      logger.error(`CreateCategoryController: ${error.message}`);
      return next(error);
    }
  }
}
