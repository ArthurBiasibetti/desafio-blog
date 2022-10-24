import { singleton } from 'tsyringe';
import { CategoryRepository } from '../../repositories/categoryRepository';
import ApiError from '../../utils/apiError.utils';
import { ICreateCategoryRequestDTO } from './CreateCategoryRequestDTO';

@singleton()
export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  private validateData(data: ICreateCategoryRequestDTO) {
    const errors = [];

    if (!data.name) {
      errors.push('name is required!');
    }

    if (errors.length) {
      throw new ApiError(400, errors, true, 'Invalid request!');
    }
  }

  private async validateCategoryExist(data: ICreateCategoryRequestDTO) {
    const category = await this.categoryRepository.findByName(data.name);

    if (category) {
      throw new ApiError(
        400,
        ['Category alredy exist!'],
        true,
        'Invalid request!'
      );
    }
  }

  async execute(data: ICreateCategoryRequestDTO) {
    this.validateData(data);
    await this.validateCategoryExist(data);

    const categoryId = await this.categoryRepository.create(data);

    return categoryId;
  }
}
