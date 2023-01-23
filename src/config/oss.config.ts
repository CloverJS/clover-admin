import { registerAs } from '@nestjs/config';

export default registerAs('oss', () => ({
  access_key_id: String(process.env.ALI_OSS_ACCESS_KEY_ID ?? ''),
  access_key_secret: String(process.env.ALI_OSS_ACCESS_KEY_SECRET ?? ''),
  arm_account: String(process.env.ALI_OSS_ARM_ACCOUNT ?? ''),
  bucket: String(process.env.ALI_OSS_BUCKET ?? ''),
}));
