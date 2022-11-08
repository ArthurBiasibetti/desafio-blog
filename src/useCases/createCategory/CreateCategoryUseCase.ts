import { singleton } from 'tsyringe';
import { CategoryRepository } from '../../repositories/categoryRepository';
import ApiError from '../../utils/apiError.utils';
import { ICreateCategoryRequestDTO } from './CreateCategoryRequestDTO';

@singleton()
export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  private async validateCategoryExist(data: ICreateCategoryRequestDTO) {
    const category = await this.categoryRepository.findByName(data.name);

    if (category) {
      throw new ApiError(422, null, true, 'CATEGORY_ALREADY_EXISTS');
    }
  }

  async execute(data: ICreateCategoryRequestDTO) {
    await this.validateCategoryExist(data);

    const categoryId = await this.categoryRepository.create(data);

    return categoryId;
  }
}
