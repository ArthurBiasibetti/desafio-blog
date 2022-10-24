import {
  Controller,
  Get,
  OperationId,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import SearchUserUseCase from './SearchUserUseCase';

@injectable()
@Route('/user')
@Tags('User')
export class SearchUserController extends Controller {
  constructor(private useCase: SearchUserUseCase) {
    super();
  }

  /**
   * @example id "de5b6d6f-4164-403b-a839-93eb5bf773ff"
   */

  @SuccessResponse(200, 'Ok')
  @Get()
  @OperationId('findUser')
  async handle(@Query() id: string) {
    const user = await this.useCase.execute({ id });

    return user;
  }
}
