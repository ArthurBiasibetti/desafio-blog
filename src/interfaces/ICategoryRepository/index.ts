import { CategoryEntity } from '../../database/entities/Category.Entity';
import { CategoryModel } from '../../database/models/Category.model';

export interface ICategoryRepository {
  findById(id: string): Promise<CategoryEntity | null>;
  findByName(name: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  create(categoryData: CategoryModel): Promise<{ id: string }>;
}
