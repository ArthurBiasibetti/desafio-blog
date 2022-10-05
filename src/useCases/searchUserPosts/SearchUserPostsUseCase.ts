import { Repository } from 'typeorm';
import { PostEntity } from '../../database/entities/Post.Entity';
import ISearchUserPostsRequestDTO from './SearchUserPostsRequestDTO';

export default class SearchUserPostsUseCase {
  constructor(private postRepository: Repository<PostEntity>) {}

  async execute(data: ISearchUserPostsRequestDTO) {
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
      where: {
        author: {
          id: data.id,
        },
      },
    });

    return posts;
  }
}
