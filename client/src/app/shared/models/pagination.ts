export interface IPagination<IProduct> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    data: IProduct;
  }
