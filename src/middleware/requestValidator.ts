import { length } from 'ramda';
import { ObjectSchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';

const requestValidator = (
  objectSchema: ObjectSchema<any, any, any, any>,
  validationKey: 'body' | 'query' | 'params' = 'body',
) => (
  req: Request<any, any, any, any>,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    objectSchema.validateSync(req[validationKey]);
    return next();
  } catch (error: any) {
    let errorResult = error;
    if (error instanceof ValidationError) {
      if (length(error.errors) > 0) {
        [errorResult] = error.errors;
      } else {
        errorResult = error;
      }
    }
    return next(errorResult);
  }
};

export default requestValidator;
