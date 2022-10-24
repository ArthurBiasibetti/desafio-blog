import {
  Controller,
  Get,
  OperationId,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import SearchCategoryUseCase from './SearchCategoryUseCase';

@injectable()
@Route('categorty')
@Tags('Category')
export class SearchCategoryController extends Controller {
  constructor(private useCase: SearchCategoryUseCase) {
    super();
  }

  /**
   * Busca todas as categorias.
   * @summary Busca todas as categorias.
   */
  @SuccessResponse('200', 'Ok')
  @Security('auth', ['user'])
  @Get()
  @OperationId('createCategory')
  async handle() {
    const posts = await this.useCase.execute();

    return posts;
  }
}
