import AppDataSource from '../database';
import { UserEntity } from '../database/entities/User.Entity';
import ApiError from './apiError.utils';

const adminAuthentication = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ApiError(401, null, true, 'USER_NOT_FOUND');
  }

  if (foundUser.role !== 'ADMIN') {
    throw new ApiError(403, null, true, 'PERMISSION_DENIED');
  }
};

export default adminAuthentication;
