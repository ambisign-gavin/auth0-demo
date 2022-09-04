import ApiError from './apiError';

export const DefaultApiErrors = {
  needEmailVerified: ApiError.create({
    status: 401,
    code: 4010001,
    message: 'need email verified.',
  }),
  mustBeANumber: (column: string): ApiError => ApiError.create({
    status: 400,
    code: 400000,
    message: `${column} must be a number type.`,
  }),
  resourceNotFound: ApiError.create({
    status: 404,
    code: 404001,
    message: 'the resource not found',
  }),
  mustBeString: (column: string): ApiError => ApiError.create({
    status: 400,
    code: 400002,
    message: `${column} must be a string type.`,
  }),
  auth0CallbackForbidden: ApiError.create({
    status: 403,
    code: 4030001,
    message: 'Forbidden',
  }),
};

export const SampleApiErrors = {
  requiredTitle: ApiError.create({
    status: 400,
    code: 400100,
    message: 'title is a required field',
  }),
  contentTooShort: ApiError.create({
    status: 400,
    code: 400101,
    message: 'content must be at least 5 characters',
  }),
  requiredContent: ApiError.create({
    status: 400,
    code: 400102,
    message: 'content is a required field',
  }),
  duplicateTitle: ApiError.create({
    status: 400,
    code: 400105,
    message: 'duplicate title',
  }),
  articleNotFound: ApiError.create({
    status: 404,
    code: 404101,
    message: 'the article not found',
  }),
};

export const UserApiErrors = {
  nameNotBeEmpty: ApiError.create({
    status: 400,
    code: 400100,
    message: 'name must be at least 1 characters',
  }),
  alreadyVerifiedEmail: ApiError.create({
    status: 400,
    code: 400101,
    message: 'your email has already been verified.',
  }),
  passwordsNotMatch: ApiError.create({
    status: 400,
    code: 400102,
    message: 'Passwords don\'t match',
  }),
  oldPasswordRequired: ApiError.create({
    status: 400,
    code: 400103,
    message: 'Old password is required',
  }),
  newPasswordRequired: ApiError.create({
    status: 400,
    code: 400104,
    message: 'New password is required',
  }),
  confirmPasswordRequired: ApiError.create({
    status: 400,
    code: 400105,
    message: 'Cconfirm password is required',
  }),
  wrongPasswordFormat: ApiError.create({
    status: 400,
    code: 400106,
    message: 'Minimum eight characters, at least one lower character, one upper character, one number and one special character',
  }),
  userNotFound: ApiError.create({
    status: 404,
    code: 404101,
    message: 'the user not found',
  }),
};

export const AuthApiErrors = {
  sendVerificationEmailError: ApiError.create({
    status: 400,
    code: 400200,
    message: 'send verification email error, please try again later.',
  }),
  updatePasswordError: ApiError.create({
    status: 400,
    code: 400201,
    message: 'update the password error, please try again later.',
  }),
  wrongPassword: ApiError.create({
    status: 400,
    code: 400202,
    message: 'wrong old password.',
  }),

};
