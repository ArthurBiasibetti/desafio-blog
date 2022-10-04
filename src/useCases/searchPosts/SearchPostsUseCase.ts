import { Repository } from 'typeorm';
import { PostEntity } from '../../database/entities/Post.Entity';

export default class SearchPostsUseCase {
  constructor(private postRepository: Repository<PostEntity>) {}

  async execute() {
    const posts = await this.postRepository.find({
      select: {
        author: {
          name: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      relations: { author: true, categories: true },
    });

    return posts;
  }
}
