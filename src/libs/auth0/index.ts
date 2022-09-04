import axios from 'axios';
import { pathEq, pathOr } from 'ramda';
import {
  AUTH0_API_TOKEN, AUTH0_CLIENT_ID, AUTH0_SECRET, AUTH0_URL,
} from 'src/constants/env';
import User from 'src/db/models/user';
import { AuthApiErrors } from 'src/errors';
import logger from 'src/utilities/logger';

class Auth0 {
  private axiosInstance = axios.create({
    baseURL: AUTH0_URL,
    headers: { Authorization: `Bearer ${AUTH0_API_TOKEN}` },
  });

  public async sendVerificationEmail(authId: string) {
    try {
      await this.axiosInstance.post('/api/v2/jobs/verification-email', {
        user_id: authId,
      });
    } catch (error) {
      logger.error(`[auth-sendVerificationEmail-error]: ${error}, ${pathOr('', ['response', 'data', 'message'], error)}`);
      throw AuthApiErrors.sendVerificationEmailError;
    }
  }

  public async updatePassword(user: User, updatePassword: {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  }) {
    try {
      await this.axiosInstance.post('/oauth/token', new URLSearchParams({
        grant_type: 'password',
        username: user.systemName,
        password: updatePassword.oldPassword,
        scope: 'read:sample',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_SECRET,
      }), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      await this.axiosInstance.patch(`/api/v2/users/${user.authId}`, {
        password: updatePassword.newPassword,
      });
    } catch (error) {
      logger.error(`[auth-updatePassword-error]: ${error}, ${pathOr('', ['response', 'data', 'error_description'], error)}`);
      if (pathEq(['response', 'data', 'error_description'], 'Wrong email or password.', error)) {
        throw AuthApiErrors.wrongPassword;
      }
      throw AuthApiErrors.updatePasswordError;
    }
  }
}

const auth0 = new Auth0();

export default auth0;
