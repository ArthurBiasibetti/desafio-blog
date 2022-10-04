import { Repository } from 'typeorm';
import { CategoryEntity } from '../../database/entities/Category.Entity';

export default class SearchCategoryUseCase {
  constructor(private categoryRepository: Repository<CategoryEntity>) {}

  async execute() {
    const category = await this.categoryRepository.find();

    return category;
  }
}
