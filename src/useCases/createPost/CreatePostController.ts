import {
  Body,
  Controller,
  Request,
  Route,
  Tags,
  Post,
  SuccessResponse,
  Security,
  OperationId,
} from 'tsoa';
import { injectable } from 'tsyringe';
import express from 'express';
import CreatePostUseCase from './CreatePostUseCase';
import ICreatePostRequestDTO from './CreatePostRequestDTO';

@injectable()
@Route('/post/user')
@Tags('Post')
export class CreatePostController extends Controller {
  constructor(private useCase: CreatePostUseCase) {
    super();
  }

  /**
   * Cria um post e retorna seu Id.
   * @summary Cria um post.
   */
  @SuccessResponse('201', 'Created')
  @Security('auth')
  @Post()
  @OperationId('createPost')
  async handle(
    @Body() data: Omit<ICreatePostRequestDTO, 'userId'>,
    @Request() request: express.Request
  ) {
    const user = request.res?.locals?.user || {};

    const useCaseResult = await this.useCase.execute({
      ...data,
      userId: user.id,
    });

    return useCaseResult;
  }
}
