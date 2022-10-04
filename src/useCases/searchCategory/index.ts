import AppDataSource from '../../database';
import { CategoryEntity } from '../../database/entities/Category.Entity';

import SearchCategoryUseCase from './SearchCategoryUseCase';
import SearchCategoryController from './SearchCategoryController';

const categoryRepository = AppDataSource.getRepository(CategoryEntity);
const useCase = new SearchCategoryUseCase(categoryRepository);

const controller = new SearchCategoryController(useCase);

export default controller;
