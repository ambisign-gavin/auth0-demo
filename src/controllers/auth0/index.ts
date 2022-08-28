/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import User from 'src/db/models/user';

export async function userLoginCallback(
  req: Request,
  res: Response,
): Promise<Response> {
  if (!req.body.user) {
    return res.sendStatus(400);
  }
  const {
    email_verified: emailVerified, email, user_id: authId, name,
  } = req.body.user;

  const user = await User.createIfNotExist({
    systemName: name,
    emailVerified,
    email,
    name,
    authId,
  });

  await user.createLoginLog();

  return res.sendStatus(200);
}
