import { AppDataSource } from '../../database';
import { UserEntity } from '../../database/entities/User.Entity';

import CreateSessionUseCase from './CreateSessionUseCase';
import CreateSessionController from './CreateSessionController';

const userRepository = AppDataSource.getRepository(UserEntity);
const useCase = new CreateSessionUseCase(userRepository);

const controller = new CreateSessionController(useCase);

export default controller;
