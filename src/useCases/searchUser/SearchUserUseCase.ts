import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/User.Entity';
import ApiError from '../../utils/apiError.utils';
import ISearchUserRequestDTO from './SearchUserRequestDTO';

export default class SearchUserUseCase {
  constructor(private userRepository: Repository<UserEntity>) {}

  async execute(data: ISearchUserRequestDTO) {
    const user = this.userRepository.findOne({
      where: { id: data.id },
      select: { name: true, id: true, posts: true, role: true },
      relations: { posts: true },
    });

    if (!user) {
      throw new ApiError(401, [], true, 'User not found!');
    }

    return user;
  }
}
