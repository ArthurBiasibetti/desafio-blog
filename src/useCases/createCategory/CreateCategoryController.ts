import {
  Security,
  SuccessResponse,
  Post,
  Route,
  Body,
  Tags,
  Controller,
  OperationId,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { ICreateCategoryRequestDTO } from './CreateCategoryRequestDTO';
import CreateCategoryUseCase from './CreateCategoryUseCase';

@injectable()
@Route('category')
@Tags('Category')
export class CreateCategoryController extends Controller {
  constructor(private useCase: CreateCategoryUseCase) {
    super();
  }

  /**
   * Cria uma nova Categoria e retorna seu id.
   * @summary Cria uma nova Categoria.
   */
  @SuccessResponse('201', 'Created')
  @Security('auth', ['ADMIN'])
  @Post()
  @OperationId('createCategory')
  public async handle(@Body() data: ICreateCategoryRequestDTO) {
    const useCaseResult = await this.useCase.execute(data);

    return useCaseResult;
  }
}
