import { singleton } from 'tsyringe';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/apiError.utils';
import ICreateSessionDTO from './CreateSessionDTO';
import config from '../../config/config';
import { signJwt } from '../../utils/jwt.utils';
import { UserRepository } from '../../repositories/userRepository';

@singleton()
export default class CreateSessionUseCase {
  constructor(private userRepository: UserRepository) {}

  private async validateLogin(login: ICreateSessionDTO) {
    const user = await this.userRepository.findByEmail(login.email);

    if (!user) {
      throw new ApiError(401, [], true, 'User not found!');
    }

    const passwordIsValid = await bcrypt.compare(login.password, user.password);

    if (!passwordIsValid) {
      throw new ApiError(401, [], true, 'wrong password!');
    }

    return user;
  }

  async execute(data: ICreateSessionDTO) {
    const { id, name, role, posts } = await this.validateLogin(data);

    const payload = { id };

    const token = signJwt(payload, { expiresIn: config.accessTokenTtl });

    return { token, user: { id, name, role, posts } };
  }
}
