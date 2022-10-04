import AppDataSource from '../../database';
import { PostEntity } from '../../database/entities/Post.Entity';

import SearchPostsUseCase from './SearchPostsUseCase';
import SearchPostController from './SearchPostController';

const postRepository = AppDataSource.getRepository(PostEntity);
const useCase = new SearchPostsUseCase(postRepository);

const controller = new SearchPostController(useCase);

export default controller;
