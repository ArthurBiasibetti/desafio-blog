import AppDataSource from '../database';
import { CategoryEntity } from '../database/entities/Category.Entity';
import { PostEntity } from '../database/entities/Post.Entity';
import { UserEntity } from '../database/entities/User.Entity';
import { PostModel } from '../database/models/Post.model';
import { IPostRepository } from '../interfaces/IPostRepository';

export class PostRepository implements IPostRepository {
  private repository = AppDataSource.getRepository(PostEntity);

  async findById(id: string): Promise<PostEntity | null> {
    throw new Error('Method not implemented.');
  }

  async create(
    postData: PostModel,
    author: UserEntity,
    categories: CategoryEntity[]
  ): Promise<string> {
    const post = new PostEntity();

    post.description = postData.description;
    post.name = postData.name;
    post.author = author;
    post.categories = categories;

    await this.repository.save(post);

    return post.id;
  }
}
