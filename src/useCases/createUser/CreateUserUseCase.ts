import { singleton } from 'tsyringe';
import ApiError from '../../utils/apiError.utils';
import hash from '../../utils/hash.utils';
import { UserRepository } from '../../repositories/userRepository';
import { ICreateUserRequestDTO } from './CreateUserRequestDTO';

@singleton()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  private async validateUserExist(data: ICreateUserRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new ApiError(422, null, true, 'EMAIL_ALREADY_EXIST');
    }
  }

  async execute(data: ICreateUserRequestDTO) {
    await this.validateUserExist(data);

    const hashedPassword = await hash(data.password);

    const id = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: 'USER',
    });

    return id;
  }
}
