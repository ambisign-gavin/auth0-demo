import { DefaultApiErrors, UserApiErrors } from 'src/errors';
import * as yup from 'yup';

export const PutUserProfileSchema: yup.SchemaOf<IPutUserProfileReqBody> = yup.object().shape({
  name: yup.string().optional().trim().min(1, () => UserApiErrors.nameNotBeEmpty)
    .typeError(() => DefaultApiErrors.mustBeString('name')),
});

const passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const PutUserPasswordReqBody: yup.SchemaOf<IPutUserPasswordReqBody> = yup.object().shape({
  oldPassword: yup.string()
    .required(() => UserApiErrors.oldPasswordRequired)
    .matches(passwordRegexp, () => UserApiErrors.wrongPasswordFormat),
  newPassword: yup.string()
    .required(() => UserApiErrors.newPasswordRequired)
    .matches(passwordRegexp, () => UserApiErrors.wrongPasswordFormat),
  confirmPassword: yup.string()
    .required(() => UserApiErrors.confirmPasswordRequired)
    .oneOf([yup.ref('newPassword')], () => UserApiErrors.passwordsNotMatch),
});
