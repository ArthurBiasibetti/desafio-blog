import {
  Body,
  Controller,
  OperationId,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IBadRequest } from '../../interfaces/IBadRequest';
import ICreateSessionDTO from './CreateSessionDTO';
import ICreateSessionResponseDTO from './CreateSessionResponseDTO';
import CreateSessionUseCase from './CreateSessionUseCase';

@injectable()
@Route('user/session')
@Tags('User')
export class CreateSessionController extends Controller {
  constructor(private useCase: CreateSessionUseCase) {
    super();
  }

  /**
   * Cria uma nova sessão retornando o token pelo header (authorization).
   * @summary Cria uma sessão.
   */
  @SuccessResponse('201', 'Created')
  @Response<IBadRequest[]>(400, 'Bad reuqest some field wrong data!', [
    {
      message: 'User not found!',
      error: [],
    },
    { message: 'Wrong password!', error: [] },
  ])
  @Post()
  @OperationId('createSession')
  async handle(
    @Body() data: ICreateSessionDTO
  ): Promise<ICreateSessionResponseDTO> {
    const { token, user } = await this.useCase.execute(data);

    this.setHeader('authorization', token);

    return user;
  }
}
