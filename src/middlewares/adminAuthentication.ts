import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from '../database';
import { UserEntity } from '../database/entities/User.Entity';

const adminAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const { id } = res.locals.user;

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return res.status(401).json({ message: 'User not found!' });
  }

  if (user.role !== 'ADMIN') {
    return res.status(401).json({ message: 'User is not an admin!' });
  }

  return next();
};

export default adminAuthentication;
