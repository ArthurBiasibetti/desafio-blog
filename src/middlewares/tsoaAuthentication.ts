import { Request } from 'express';
import { get } from 'lodash';
import ApiError from '../utils/apiError.utils';
import { verifyJwt } from '../utils/jwt.utils';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[]
): Promise<void> => {
  if (securityName === 'auth') {
    const accessToken = get(request, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    if (!accessToken) {
      throw new ApiError(401, [], true, 'No token provided');
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (expired) {
      throw new ApiError(401, [], true, 'Your token has expired');
    }

    if (decoded && request.res) {
      request.res.locals.user = decoded;
    }
  }
};
