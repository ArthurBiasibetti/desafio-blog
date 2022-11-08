import { singleton } from 'tsyringe';
import { CategoryEntity } from '../../database/entities/Category.Entity';
import { CategoryRepository } from '../../repositories/categoryRepository';
import { PostRepository } from '../../repositories/postRepository';
import { UserRepository } from '../../repositories/userRepository';
import ApiError from '../../utils/apiError.utils';
import ICreatePostRequestDTO from './CreatePostRequestDTO';

@singleton()
export default class CreatePostUseCase {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ) {}

  private async getAuthor(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ApiError(400, null, true, 'USER_NOT_FOUND');
    }

    return user;
  }

  private async getCategories(categories: string[]) {
    const categoriesResult: CategoryEntity[] = [];
    const errors: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const categoryId of categories) {
      // eslint-disable-next-line no-await-in-loop
      const category = await this.categoryRepository.findById(categoryId);

      if (!category) {
        errors.push(categoryId);
      }

      if (category) {
        categoriesResult.push(category);
      }
    }

    if (errors.length) {
      throw new ApiError(422, errors, true, 'CATEGORY_NOT_FOUND');
    }

    return categoriesResult;
  }

  async execute(data: ICreatePostRequestDTO) {
    const author = await this.getAuthor(data.userId);
    const categories = await this.getCategories(data.categories);

    const postId = await this.postRepository.create(
      {
        description: data.description,
        name: data.name,
      },
      author,
      categories
    );

    return postId;
  }
}
