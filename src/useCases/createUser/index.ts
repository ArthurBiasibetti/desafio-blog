import { UserRepository } from '../../repositories/userRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const userRepository = new UserRepository();
const useCase = new CreateUserUseCase(userRepository);

const controller = new CreateUserController(useCase);

export default controller;
