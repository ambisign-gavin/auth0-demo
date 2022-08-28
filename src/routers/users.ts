import { Router } from 'express';
import * as controller from 'src/controllers/users';
import { handleError } from 'src/utilities/apiUtil';
import { requiresAuth } from 'express-openid-connect';
import requestValidator from 'src/middleware/requestValidator';
import { PutUserPasswordReqBody, PutUserProfileSchema } from 'src/controllers/users/schema';
import emailVerifiedChecker from 'src/middleware/emailVerifiedChecker';

const UsersRouter = Router();

UsersRouter.use(requiresAuth());

UsersRouter.route('/users/mine/profile').get(
  emailVerifiedChecker,
  handleError(controller.getUserProfile),
).put(
  emailVerifiedChecker,
  requestValidator(PutUserProfileSchema, 'body'),
  handleError(controller.updateUserProfile),
);

UsersRouter.route('/users/mine/verificationEmail').post(
  handleError(controller.sendVerificationEmail),
);

UsersRouter.route('/users/verificationEmail/cb').get(
  handleError(controller.verificationEmailCallback),
);

UsersRouter.route('/users/mine/password').put(
  emailVerifiedChecker,
  requestValidator(PutUserPasswordReqBody, 'body'),
  handleError(controller.updateUserPassword),
);

UsersRouter.route('/users/mine/session').put(
  emailVerifiedChecker,
  handleError(controller.touchUserSession),
);

UsersRouter.route('/users').get(
  emailVerifiedChecker,
  handleError(controller.getUserList),
);

UsersRouter.route('/users/statistics').get(
  emailVerifiedChecker,
  handleError(controller.getUsersStatistics),
);

export default UsersRouter;
