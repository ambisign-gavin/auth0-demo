import { Request, Response, NextFunction } from 'express';
import User from 'src/db/models/user';
import { DefaultApiErrors } from 'src/errors';

const emailVerifiedChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByOidcUser(req.oidc.user);
    if (user.emailVerified) {
      return next();
    }
    throw DefaultApiErrors.needEmailVerified;
  } catch (error) {
    return next(error);
  }
};

export default emailVerifiedChecker;
