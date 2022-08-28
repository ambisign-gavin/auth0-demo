declare interface IPutUserProfileReqBody {
  name?: string;
}

declare interface IPutUserPasswordReqBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
