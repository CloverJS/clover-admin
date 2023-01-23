import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Result } from 'src/common/interfaces/result.interface';
import { UpLoadFileDto } from './dto/up-load-file.dto';
import { AliOssSTS } from './file.interface';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('defaultFile'))
  async UploadedFile(
    @Body() body: UpLoadFileDto, // 如果需要获取body里除文件外的其他数据
    @UploadedFile() file: Express.Multer.File, // 获取上传的文件
  ): Promise<Result<Express.Multer.File>> {
    return { code: 200, message: '上传成功', data: { list: [file] } };
  }

  @Post('ali-oss-sts')
  async AliOssSTS(): Promise<Result<AliOssSTS>> {
    const aliOssSTS = await this.fileService.createOneSTS();
    return { code: 200, message: '获取成功', data: { list: [aliOssSTS] } };
  }
}
