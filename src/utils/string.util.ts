/**
 * 字符串工具方法
 */

/** 当字符串长度超出限制后, 省略它并以指定字符代替 */
export function cutOffStringEnd(
  str: string,
  length: number,
  addStr: string,
): string {
  if (str.length > length) {
    return str.substr(0, length) + addStr;
  }
  return str;
}
