import {
  Route,
  Post,
  Body,
  SuccessResponse,
  Tags,
  Controller,
  Response,
  Example,
  OperationId,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IBadRequest } from '../../interfaces/IBadRequest';
import { ICreateUserRequestDTO } from './CreateUserRequestDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

@injectable()
@Route('user')
@Tags('User')
export class CreateUserController extends Controller {
  constructor(private useCase: CreateUserUseCase) {
    super();
  }

  /**
   * Cria um novo Usuário e retorna seu id.
   * @summary Cria um novo Usuário.
   */
  @SuccessResponse('201', 'Created')
  @Example('de5b6d6f-4164-403b-a839-93eb5bf773ff')
  @Response<IBadRequest>(400, 'Bad reuqest some field wrong data!', {
    message: 'Email alredy exist!',
    error: [],
  })
  @Post()
  @OperationId('createUser')
  async handle(@Body() data: ICreateUserRequestDTO): Promise<string> {
    const useCaseResult = await this.useCase.execute(data);

    return useCaseResult;
  }
}
