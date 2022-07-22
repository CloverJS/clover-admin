import { mkdir, stat, writeFile } from 'fs';
/**
 * 文件操作工具函数
 */

/** 创建文件夹 */
export function createFolder(path: string): Promise<void> {
  return new Promise<void>((resolve, rejects) => {
    stat(path, (err, stats) => {
      if (err) {
        // ⽂件夹不存在则创建文件夹
        mkdir(path, (err) => {
          if (err) rejects();
          resolve();
        });
      }
      resolve();
    });
  });
}

/** 创建文件 */
export function createFile(path: string): Promise<void> {
  return new Promise((resolve, rejects) => {
    stat(path, (err, stats) => {
      if (err) {
        // ⽂件不存在则创建文件
        writeFile(path, '', { flag: 'a+' }, (err) => {
          if (err) {
            rejects(err);
          }
          resolve();
        });
      }
      resolve();
    });
  });
}
