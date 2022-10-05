import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/apiError.utils';
import ICreateSessionDTO from './CreateSessionDTO';
import config from '../../config/config';
import { UserEntity } from '../../database/entities/User.Entity';
import { signJwt } from '../../utils/jwt.utils';

export default class CreateSessionUseCase {
  constructor(private userRepository: Repository<UserEntity>) {}

  private async validateLogin(login: ICreateSessionDTO) {
    const user = await this.userRepository.findOneBy({ email: login.email });

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
    const { id, name, role } = await this.validateLogin(data);

    const payload = { id };

    const token = signJwt(payload, { expiresIn: config.accessTokenTtl });

    return { token, user: { id, name, role } };
  }
}
