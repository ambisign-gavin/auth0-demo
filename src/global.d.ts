declare interface ErrorResponse {
  code: number;
  message: string;
}

declare type ApiErrorInfo = {
  status: number;
  code: number;
  message: string;
};

declare namespace Express {
  export interface Request {
    oidc: {
      user: Record<string, any>;
    };
    pagination: {
      offset: number;
      limit: number;
    };
  }
}

declare interface IPaginationReqQuery {
  pageIndex?: number;
  countPerPage?: number;
}

declare interface IPaginationResBody<R> {
  totalPage: number;
  currentPageIndex: number;
  totalCount: number;
  countPerPage: number;
  records: R[];
}

declare interface IIdParam {
  id: number;
}
