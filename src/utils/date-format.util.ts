/**
 * 日期格式化工具函数
 */
export function dateFormat(t: string, type = 'date'): string {
  let date: Date;
  if (type === 'date') {
    date = new Date(t);
  } else if (type === 'timestamp') {
    date = new Date(parseInt(t));
  }
  if (!t || t.length === 0) {
    return '';
  }
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  );
}
