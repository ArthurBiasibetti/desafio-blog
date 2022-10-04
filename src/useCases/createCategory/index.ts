import AppDataSource from '../../database';
import { CategoryEntity } from '../../database/entities/Category.Entity';

import CreateCategoryUseCase from './CreateCategoryUseCase';
import CreateCategoryController from './CreateCategoryController';

const categoryRepository = AppDataSource.getRepository(CategoryEntity);
const useCase = new CreateCategoryUseCase(categoryRepository);

const controller = new CreateCategoryController(useCase);

export default controller;
