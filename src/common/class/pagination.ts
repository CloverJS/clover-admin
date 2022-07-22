import { Pagination as PaginationInterface } from 'src/common/interfaces/pagination.interface';

export class Pagination implements PaginationInterface {
  page: number;
  totalPage: number;
  pageSize: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;

  constructor(
    page: number,
    totalPage: number,
    pageSize: number,
    total: number,
    hasPrev: boolean,
    hasNext: boolean,
  ) {
    this.page = page;
    this.totalPage = totalPage;
    this.pageSize = pageSize;
    this.total = total;
    this.hasPrev = hasPrev;
    this.hasNext = hasNext;
  }

  public static build(
    total: number,
    page: number,
    pageSize: number,
  ): Pagination {
    const totalPage: number = Math.ceil(total / pageSize);
    const hasPrev = page > 1;
    const hasNext = page < totalPage;
    return new Pagination(page, totalPage, pageSize, total, hasPrev, hasNext);
  }
}
