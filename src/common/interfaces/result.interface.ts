import { Pagination } from './pagination.interface';

interface Data<T> extends Pagination {
  list: Array<T>;
}
interface ErrorMessage {
  statusCode: number;
  message: Array<string>;
  error?: string;
}
export interface Result<T> {
  code: number;
  message: string | ErrorMessage;
  data?: Data<T>;
  error?: string;
}
