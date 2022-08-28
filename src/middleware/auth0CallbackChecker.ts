import { Request, Response, NextFunction } from 'express';
import { AUTH0_CB_TOKEN } from 'src/constants/env';
import { DefaultApiErrors } from 'src/errors';

const auth0CallbackChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.headers.authorization !== AUTH0_CB_TOKEN) {
      throw DefaultApiErrors.auth0CallbackForbidden;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export default auth0CallbackChecker;
