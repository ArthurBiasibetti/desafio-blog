import { singleton } from 'tsyringe';
import { PostRepository } from '../../repositories/postRepository';

@singleton()
export default class SearchPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute() {
    const posts = await this.postRepository.findAll();

    return posts;
  }
}
