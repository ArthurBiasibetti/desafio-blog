import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = get(req, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    if (!accessToken) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }
};

export default authentication;
