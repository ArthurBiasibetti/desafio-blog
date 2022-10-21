import {
  Body,
  Controller,
  Request,
  Route,
  Tags,
  Post,
  SuccessResponse,
  Security,
} from 'tsoa';
import { injectable } from 'tsyringe';
import express from 'express';
import CreatePostUseCase from './CreatePostUseCase';
import ICreatePostRequestDTO from './CreatePostRequestDTO';

type DataType = Omit<ICreatePostRequestDTO, 'userId'>;

@injectable()
@Route('/post/user')
@Tags('Post')
export class CreatePostController extends Controller {
  constructor(private useCase: CreatePostUseCase) {
    super();
  }

  @SuccessResponse('201', 'Created')
  @Security('auth')
  @Post()
  async handle(@Body() data: DataType, @Request() request: express.Request) {
    const user = request.res?.locals?.user || {};

    const useCaseResult = await this.useCase.execute({
      ...data,
      userId: user.id,
    });

    return useCaseResult;
  }
}
