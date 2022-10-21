import { CategoryEntity } from '../../database/entities/Category.Entity';
import { CategoryModel } from '../../database/models/Category.model';

export interface ICategoryRepository {
  findById(id: string): Promise<CategoryEntity | null>;
  create(categoryData: CategoryModel): Promise<string>;
}
