import AppDataSource from '../database';
import { CategoryEntity } from '../database/entities/Category.Entity';
import { CategoryModel } from '../database/models/Category.model';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private repository = AppDataSource.getRepository(CategoryEntity);

  create(categoryData: CategoryModel): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.repository
      .createQueryBuilder('categories')
      .where('id::text = :id', { id })
      .getOne();

    return category;
  }
}
