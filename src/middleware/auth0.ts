import { auth, ConfigParams } from 'express-openid-connect';
import {
  AUTH0_CLIENT_ID, AUTH0_SECRET, AUTH0_URL, BASE_URL,
} from 'src/constants/env';

const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: BASE_URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_URL,
  errorOnRequiredAuth: true,
};

export default auth(config);
