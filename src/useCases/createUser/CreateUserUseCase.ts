import { Repository } from 'typeorm';
import ApiError from '../../utils/apiError.utils';
import { UserEntity } from '../../database/entities/User.Entity';
import { ICreateUserRequestDTO } from './CreateUserRequestDTO';
import hash from '../../utils/hash.utils';

export default class CreateUserUseCase {
  constructor(private userRepository: Repository<UserEntity>) {}

  private async validateUserExist(data: ICreateUserRequestDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new ApiError(400, [], true, 'Email alredy exist!');
    }
  }

  async execute(data: ICreateUserRequestDTO) {
    await this.validateUserExist(data);

    const hashedPassword = await hash(data.password);

    const user = new UserEntity();
    user.email = data.email;
    user.password = hashedPassword;
    user.name = data.name;

    await this.userRepository.save(user);

    return user.id;
  }
}
