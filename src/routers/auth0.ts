import { Router } from 'express';
import * as controller from 'src/controllers/auth0';
import auth0CallbackChecker from 'src/middleware/auth0CallbackChecker';
import { handleError } from 'src/utilities/apiUtil';

const Auth0Router = Router();

Auth0Router.route('/auth0/login/cb').post(
  auth0CallbackChecker,
  handleError(controller.userLoginCallback),
);

export default Auth0Router;
