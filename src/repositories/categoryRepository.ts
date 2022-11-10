import AppDataSource from '../database';
import { CategoryEntity } from '../database/entities/Category.Entity';
import { CategoryModel } from '../database/models/Category.model';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

const repository = AppDataSource.getRepository(CategoryEntity);
export class CategoryRepository implements ICategoryRepository {
  async create(categoryData: CategoryModel): Promise<{ id: string }> {
    const category = new CategoryEntity();
    category.name = categoryData.name;

    const { id } = await repository.save(category);

    return { id };
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await repository.find();

    return categories;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await repository
      .createQueryBuilder('categories')
      .where('UPPER(:name) = UPPER(name)', { name })
      .getOne();

    return category;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await repository
      .createQueryBuilder('categories')
      .where('id::text = :id', { id })
      .getOne();

    return category;
  }
}
