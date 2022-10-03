import { Repository } from 'typeorm';
import ApiError from '../../utils/apiError.utils';
import { UserEntity } from '../../database/entities/User.Entity';
import { ICreateUserRequestDTO } from './CreateUserRequestDTO';
import hash from '../../utils/hash.utils';

export default class CreateUserUseCase {
  constructor(private userRepository: Repository<UserEntity>) {}

  private validateData(data: ICreateUserRequestDTO) {
    const errors = [];

    if (!data.email) {
      errors.push('email is required!');
    }

    if (!data.name) {
      errors.push('name is required!');
    }

    if (!data.password) {
      errors.push('password is required!');
    }

    if (errors.length) {
      throw new ApiError(400, errors, false, 'Invalid request');
    }
  }

  private async validateUserExist(data: ICreateUserRequestDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new ApiError(400, [], false, 'Email alredy exist!');
    }
  }

  async execute(data: ICreateUserRequestDTO) {
    this.validateData(data);
    await this.validateUserExist(data);

    const hashedPassword = await hash(data.password);

    const user = new UserEntity();
    user.email = data.email;
    user.password = hashedPassword;
    user.name = data.name;

    await this.userRepository.save(user);

    return user;
  }
}
