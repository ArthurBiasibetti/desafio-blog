import { AppDataSource } from '../../database';
import { UserEntity } from '../../database/entities/User.Entity';

import CreatePostUseCase from './CreatePostUseCase';
import CreatePostController from './CreatePostController';
import { PostEntity } from '../../database/entities/Post.Entity';
import { CategoryEntity } from '../../database/entities/Category.Entity';

const userRepository = AppDataSource.getRepository(UserEntity);
const postRepository = AppDataSource.getRepository(PostEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);
const useCase = new CreatePostUseCase(
  postRepository,
  userRepository,
  categoryRepository
);

const controller = new CreatePostController(useCase);

export default controller;
