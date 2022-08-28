export default class ApiError extends Error {
  public status = 500;

  public code = 0;

  constructor(
    errorInfo: ApiErrorInfo = {
      status: 500,
      code: 500000,
      message: 'unknow error',
    },
  ) {
    super(errorInfo.message);
    this.status = errorInfo.status;
    this.code = errorInfo.code;
  }

  public static create(errorInfo?: ApiErrorInfo): ApiError {
    return new ApiError(errorInfo);
  }
}
