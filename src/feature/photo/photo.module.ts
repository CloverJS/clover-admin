import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

//TODO 添加photo Module层
@Module({
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
