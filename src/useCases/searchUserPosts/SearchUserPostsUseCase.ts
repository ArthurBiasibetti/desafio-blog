import { singleton } from 'tsyringe';
import { PostRepository } from '../../repositories/postRepository';
import ISearchUserPostsRequestDTO from './SearchUserPostsRequestDTO';

@singleton()
export class SearchUserPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: ISearchUserPostsRequestDTO) {
    const posts = await this.postRepository.findByUserId(data.id);

    return posts;
  }
}
