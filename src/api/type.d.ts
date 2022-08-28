declare interface IPaginationQuery {
  pageIndex: number
  countPerPage: number
}

declare interface IApiPaginationResponse<TData> {
  records: TData[];
  currentPageIndex: number;
  totalPage: number;
  totalCount: number;
}
