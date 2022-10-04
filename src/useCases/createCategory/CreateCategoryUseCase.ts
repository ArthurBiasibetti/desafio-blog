import { Repository } from 'typeorm';
import { CategoryEntity } from '../../database/entities/Category.Entity';
import ApiError from '../../utils/apiError.utils';
import { ICreateCategoryRequestDTO } from './CreateCategoryRequestDTO';

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: Repository<CategoryEntity>) {}

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
    const category = await this.categoryRepository
      .createQueryBuilder('categories')
      .where('UPPER(:name) = UPPER(name)', { name: data.name })
      .getOne();

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

    const category = new CategoryEntity();
    category.name = data.name;

    await this.categoryRepository.save(category);

    return category.id;
  }
}
