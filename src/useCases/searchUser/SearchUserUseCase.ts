import { singleton } from 'tsyringe';
import { UserRepository } from '../../repositories/userRepository';
import ISearchUserRequestDTO from './SearchUserRequestDTO';

@singleton()
export default class SearchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ISearchUserRequestDTO) {
    const user = this.userRepository.findById(data.id);

    return user;
  }
}
