import {
  Controller,
  Get,
  OperationId,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import express from 'express';
import { injectable } from 'tsyringe';
import { SearchUserPostsUseCase } from './SearchUserPostsUseCase';

@injectable()
@Route('post/user')
@Tags('Post')
export class SearchUserPostsController extends Controller {
  constructor(private useCase: SearchUserPostsUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Security('auth')
  @Get()
  @OperationId('findPostUser')
  async handle(@Request() request: express.Request) {
    const user = request.res?.locals?.user || {};
    const posts = await this.useCase.execute(user);

    return posts;
  }
}
