import { IProduct } from "./product"

export interface IPagination {
    pageIndex: number
    pageSize: number
    totalCount: number
    data: IProduct[]
  }
