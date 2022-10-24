import AppDataSource from '../database';
import { UserEntity } from '../database/entities/User.Entity';
import ApiError from './apiError.utils';

const adminAuthentication = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ApiError(401, [], true, 'User not found!');
  }

  if (foundUser.role !== 'ADMIN') {
    throw new ApiError(401, [], true, 'User is not an ADMIN!');
  }
};

export default adminAuthentication;
