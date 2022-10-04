import { Request, Response, NextFunction } from 'express';

import AppDataSource from '../database';
import { UserEntity } from '../database/entities/User.Entity';

const adminAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const { user } = res.locals;

  if (!user) {
    return res.sendStatus(403);
  }

  const foundUser = await userRepository.findOne({ where: { id: user.id } });

  if (!foundUser) {
    return res.status(401).json({ message: 'User not found!' });
  }

  if (foundUser.role !== 'ADMIN') {
    return res.status(401).json({ message: 'User is not an admin!' });
  }

  return next();
};

export default adminAuthentication;
