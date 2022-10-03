import { AppDataSource } from '../../database';
import { UserEntity } from '../../database/entities/User.Entity';

import CreateUserUseCase from './CreateUserUseCase';
import CreateUserController from './CreateUserController';

const userRepository = AppDataSource.getRepository(UserEntity);
const useCase = new CreateUserUseCase(userRepository);

const controller = new CreateUserController(useCase);

export default controller;
