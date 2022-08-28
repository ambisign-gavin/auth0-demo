import { Request, Response } from 'express';
import User from 'src/db/models/user';
import { UserApiErrors } from 'src/errors';
import auth0 from 'src/libs/auth0';
import Sequelize, { Op } from 'sequelize';
import LoginLog from 'src/db/models/loginLog';
import { toPaginationResBody } from 'src/utilities/apiUtil';

export async function getUserProfile(
  req: Request,
  res: Response,
): Promise<Response> {
  const user = await User.findByOidcUser(req.oidc.user, {
    attributes: [
      'id',
      'name',
      'email',
      'emailVerified',
      'registerSource',
      ['created_at', 'signUpAt'],
    ],
  });
  return res.status(200).json(user);
}

export async function updateUserProfile(
  req: Request<IIdParam, any, IPutUserProfileReqBody>,
  res: Response,
): Promise<Response> {
  const user = await User.findByOidcUser(req.oidc.user);
  if (req.body.name) {
    user.set('name', req.body.name);
  }
  await user.save();
  return res.sendStatus(200);
}

export async function sendVerificationEmail(
  req: Request,
  res: Response,
): Promise<Response> {
  const user = await User.findByOidcUser(req.oidc.user);
  if (user.registerSource === 'email') {
    await auth0.sendVerificationEmail(user.authId);
  } else {
    throw UserApiErrors.alreadyVerifiedEmail;
  }

  return res.sendStatus(200);
}

export async function verificationEmailCallback(
  req: Request,
  res: Response,
): Promise<any> {
  const user = await User.findByOidcUser(req.oidc.user);
  user.set('emailVerified', true);
  await user.save();
  return res.redirect('/');
}

export async function updateUserPassword(
  req: Request<IIdParam, any, IPutUserPasswordReqBody>,
  res: Response,
): Promise<Response> {
  const user = await User.findByOidcUser(req.oidc.user);
  await auth0.updatePassword(user, req.body);
  return res.sendStatus(200);
}

export async function touchUserSession(
  req: Request,
  res: Response,
): Promise<Response> {
  const user = await User.findByOidcUser(req.oidc.user);
  user.set('lastSessionAt', new Date());
  await user.save();
  return res.sendStatus(200);
}

export async function getUserList(
  req: Request,
  res: Response,
): Promise<Response> {
  const { rows, count } = await User.findWithPaginationRequest(req, {
    subQuery: false,
    attributes: [
      'id',
      'name',
      [
        Sequelize.fn('COUNT', Sequelize.col('User.id')), 'loginCount',
      ],
      ['created_at', 'signUpAt'],
      'lastSessionAt',
    ],
    include: [
      {
        model: LoginLog,
        as: 'loginLogs',
        attributes: [],
      },
    ],
    group: 'User.id',
  });
  return res.status(200).json(toPaginationResBody(count.length, rows, req));
}

export async function getUsersStatistics(
  req: Request,
  res: Response,
): Promise<Response> {
  const userCount = await User.count();
  const todayActivedSessionCount = await User.count({
    where: Sequelize.where(
      Sequelize.fn('DATE', Sequelize.col('last_session_at')),
      Sequelize.fn('CURDATE'),
    ),
  });
  const activedSessionCountLastWeek = await User.count({
    where: {
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('last_session_at')),
          '>=',
          Sequelize.literal('CURDATE() - 7'),
        ),
        Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('last_session_at')),
          '<',
          Sequelize.fn('CURDATE'),
        ),
      ],
    },
  });
  return res.status(200).json({
    userCount,
    todayActivedSessionCount,
    averageActivedSessionCountLastWeek: Math.ceil(activedSessionCountLastWeek / 7),
  });
}
