import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import dayjs from 'dayjs';
import * as dayjs from 'dayjs'; // 如果dayjs导入报错, 则使用这个导入方式
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义文件存储路径
        destination: `./client/fileUpload/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`); // extname('test.jpg') => .jpg
          // 如果不需要自定义文件名, 则直接使用原文件名即可
          // return cb(null, file.originalname);
        },
      }),
      /**
       * 文件格式过滤器, 不被允许的文件将被禁止上传
       *  - file.fieldname就是设置的name,比如现在单文件上传就是file 或 image,多文件上传就是files 或 images
       */
      fileFilter: function (req, file, cb) {
        const /** !Map<RegExp, Array<string>> */ field = new Map([
            [/^(image){1}(s?)$/, ['.png', '.jpg', '.jpeg', '.gif', '.bmp']],
            [
              /^(file){1}(s?)$/,
              ['.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.pdf'],
            ],
            [
              /^(defaultFile)$/,
              [
                '.png',
                '.jpg',
                '.jpeg',
                '.gif',
                '.bmp',
                '.xls',
                '.xlsx',
                '.xlsm',
                '.doc',
                '.docx',
                '.pdf',
              ],
            ],
          ]);
        const allowFile = [...field].filter(([key, value]) =>
          key.test(file.fieldname),
        )[0][1];
        const extName = extname(file.originalname).toLowerCase();
        if (allowFile.includes(extName)) {
          cb(null, true);
        } else {
          cb(new Error('FileNotAllow'), false);
        }
      },
      // 对上传的数据大小进行限制
      limits: {
        // 文件最大5MB
        fileSize: 5242880,
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
