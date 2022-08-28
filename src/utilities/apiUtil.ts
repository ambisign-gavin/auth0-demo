import { NextFunction, Request, Response } from 'express';

export function toPaginationResBody<R = any>(
  totalCount: number,
  rows: R[],
  req: Request<any, any, any, IPaginationReqQuery>,
): IPaginationResBody<R> {
  return {
    countPerPage: Number(req.query.countPerPage) || 10,
    currentPageIndex: Number(req.query.pageIndex) || 0,
    totalPage: Math.ceil(totalCount / (req.query.countPerPage || 10)),
    totalCount,
    records: rows,
  };
}

export const handleError = (
  func: (
    _req: Request<any, any, any, any>,
    _res: Response,
    _next: NextFunction,
  ) => any,
) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | any | Response> => {
  try {
    return await Promise.resolve(func(req, res, next));
  } catch (error) {
    return next(error);
  }
};
