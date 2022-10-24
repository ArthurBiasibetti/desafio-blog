import AppDataSource from '../database';
import { CategoryEntity } from '../database/entities/Category.Entity';
import { CategoryModel } from '../database/models/Category.model';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private repository = AppDataSource.getRepository(CategoryEntity);

  async create(categoryData: CategoryModel): Promise<string> {
    const category = new CategoryEntity();
    category.name = categoryData.name;

    const { id } = await this.repository.save(category);

    return id;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await this.repository
      .createQueryBuilder('categories')
      .where('UPPER(:name) = UPPER(name)', { name })
      .getOne();

    return category;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.repository
      .createQueryBuilder('categories')
      .where('id::text = :id', { id })
      .getOne();

    return category;
  }
}
