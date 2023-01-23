import { Injectable } from '@nestjs/common';
import { AliOssSTS } from './file.interface';
import { STS } from 'ali-oss';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async createOneSTS(): Promise<AliOssSTS> {
    try {
      const sts = new STS({
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: this.configService.get<string>('oss.access_key_id'),
        accessKeySecret: this.configService.get<string>('oss.access_key_secret'),
      });
      const result = await sts.assumeRole(
        this.configService.get<string>('oss.arm_account'),
        '',
        '900',
        this.configService.get<string>('oss.bucket'),
      );
      console.log(result);
      return {
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
