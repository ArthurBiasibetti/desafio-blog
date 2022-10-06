import AppDataSource from '../../database';
import { UserEntity } from '../../database/entities/User.Entity';

import SearchUserUseCase from './SearchUserUseCase';
import SearchUserController from './SearchUserController';

const userEntity = AppDataSource.getRepository(UserEntity);
const useCase = new SearchUserUseCase(userEntity);

const controller = new SearchUserController(useCase);

export default controller;
