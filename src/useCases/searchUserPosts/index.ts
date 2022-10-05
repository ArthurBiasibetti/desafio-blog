import AppDataSource from '../../database';
import { PostEntity } from '../../database/entities/Post.Entity';

import SearchUserPostsUseCase from './SearchUserPostsUseCase';
import SearchUserPostsController from './SearchUserPostsController';

const postRepository = AppDataSource.getRepository(PostEntity);
const useCase = new SearchUserPostsUseCase(postRepository);

const controller = new SearchUserPostsController(useCase);

export default controller;
