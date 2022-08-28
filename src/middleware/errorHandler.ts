import { Response, Request } from 'express';
import { prop } from 'ramda';
import { LOGIN_URL } from 'src/constants/env';
import ApiError from 'src/errors/apiError';
import logger from 'src/utilities/logger';

const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response<ErrorResponse | any>,
): Response<ErrorResponse | any> => {
  let apiError = error;
  if (!(apiError instanceof ApiError)) {
    logger.error(`${req.originalUrl} [server-error]: ${apiError}`);
    // error from auth0
    if (prop('status', error) === 401) {
      return res.status(401).json({
        loginURL: LOGIN_URL,
      });
    }
    apiError = ApiError.create();
  } else {
    logger.error(`${req.originalUrl} [api-error]: ${apiError}`);
  }
  return res.status(apiError.status).json({
    code: apiError.code,
    message: apiError.message,
  });
};

export default errorHandler;
