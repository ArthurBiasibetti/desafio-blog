import { singleton } from 'tsyringe';
import { CategoryRepository } from '../../repositories/categoryRepository';

@singleton()
export default class SearchCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    const category = await this.categoryRepository.findAll();

    return category;
  }
}
