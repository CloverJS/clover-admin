// 分页接口
export interface Page {
  /** 页码 */
  page: number;
  /** 单页条数 */
  pageSize: number;
  /** 跳过记录数 */
  getSkip(): number;
}
