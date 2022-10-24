import { CategoryEntity } from '../../database/entities/Category.Entity';
import { PostEntity } from '../../database/entities/Post.Entity';
import { UserEntity } from '../../database/entities/User.Entity';
import { PostModel } from '../../database/models/Post.model';

export interface IPostRepository {
  findByUserId(userId: string): Promise<PostEntity[] | null>;
  findAll(): Promise<PostEntity[] | null>;
  create(
    postData: PostModel,
    author: UserEntity,
    categories: CategoryEntity[]
  ): Promise<string>;
}
