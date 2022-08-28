import { DefaultApiErrors } from 'src/errors';
import * as yup from 'yup';

export const IdParamSchema: yup.SchemaOf<IIdParam> = yup.object().shape({
  id: yup
    .number()
    .typeError(() => DefaultApiErrors.mustBeANumber('id'))
    .required(() => DefaultApiErrors.resourceNotFound),
});

export const PaginationQuerySchema: yup.SchemaOf<IPaginationReqQuery> = yup
  .object()
  .shape({
    pageIndex: yup
      .number()
      .min(0)
      .default(0)
      .typeError(() => DefaultApiErrors.mustBeANumber('pageIndex')),
    countPerPage: yup
      .number()
      .min(0)
      .default(10)
      .typeError(() => DefaultApiErrors.mustBeANumber('countPerPage')),
  });
