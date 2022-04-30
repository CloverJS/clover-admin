import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Result } from 'src/common/interfaces/result.interface';
import { UpLoadFileDto } from './dto/up-load-file.dto';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('defaultFile'))
  async UploadedFile(
    @Body() body: UpLoadFileDto, // 如果需要获取body里除文件外的其他数据
    @UploadedFile() file: Express.Multer.File, // 获取上传的文件
  ): Promise<Result> {
    return { code: 200, message: '上传成功', data: file };
  }
}
