export interface Result {
  code: number;
  message: string;
  data?: object;
  error?: string | Array<string>;
}