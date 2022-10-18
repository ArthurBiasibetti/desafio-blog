import { Repository } from 'typeorm';
import { CategoryEntity } from '../../database/entities/Category.Entity';
import { PostEntity } from '../../database/entities/Post.Entity';
import { UserEntity } from '../../database/entities/User.Entity';
import ApiError from '../../utils/apiError.utils';
import ICreatePostRequestDTO from './CreatePostRequestDTO';

export default class CreatePostUseCase {
  constructor(
    private postRepository: Repository<PostEntity>,
    private userRepository: Repository<UserEntity>,
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  private async getAuthor(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new ApiError(400, [], true, 'User not found!');
    }

    return user;
  }

  private async getCategories(categories: string[]) {
    const categoriesResult: CategoryEntity[] = [];
    const errors: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const categoryId of categories) {
      // eslint-disable-next-line no-await-in-loop
      const category = await this.categoryRepository
        .createQueryBuilder('categories')
        .where('id::text = :id', { id: categoryId })
        .getOne();

      if (!category) {
        errors.push(`category ${categoryId} not found`);
      }

      if (category) {
        categoriesResult.push(category);
      }
    }

    if (errors.length) {
      throw new ApiError(400, errors, true, 'Invalid request!');
    }

    return categoriesResult;
  }

  async execute(data: ICreatePostRequestDTO) {
    const author = await this.getAuthor(data.userId);
    const categories = await this.getCategories(data.categories);

    const post = new PostEntity();
    post.description = data.description;
    post.name = data.name;
    post.author = author;
    post.categories = categories;

    await this.postRepository.save(post);

    return post.id;
  }
}
