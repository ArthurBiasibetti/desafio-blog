import { singleton } from 'tsyringe';
import { UserRepository } from '../../repositories/userRepository';
import ApiError from '../../utils/apiError.utils';
import ISearchUserRequestDTO from './SearchUserRequestDTO';

@singleton()
export default class SearchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ISearchUserRequestDTO) {
    const user = this.userRepository.findById(data.id);

    if (!user) {
      throw new ApiError(401, [], true, 'User not found!');
    }

    return user;
  }
}
