import {
  Route,
  SuccessResponse,
  Tags,
  Get,
  Controller,
  OperationId,
} from 'tsoa';
import { injectable } from 'tsyringe';
import SearchPostsUseCase from './SearchPostsUseCase';

@injectable()
@Route('post')
@Tags('Post')
export class SearchPostsController extends Controller {
  constructor(private useCase: SearchPostsUseCase) {
    super();
  }

  /**
   * Busca todos os posts junto com o author e as categorias.
   * @summary Busca todos os posts.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  @OperationId('findPosts')
  async handle() {
    const posts = await this.useCase.execute();

    return posts;
  }
}
