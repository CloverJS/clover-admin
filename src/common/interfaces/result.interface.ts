interface Data<T> {
  page?: number;
  totalPage?: number;
  pageSize?: number;
  total?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
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
