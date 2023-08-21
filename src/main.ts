import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalResponse } from "./common/response/response"
import { HttpFilter } from "./common/filters/httpFilter"
import * as session from "express-session"
import * as cors from "cors"
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors())
  app.useGlobalInterceptors(new GlobalResponse())
  app.useGlobalFilters(new HttpFilter())
  app.use(session({
    secret: 'lee',
    rolling: true,
    name: 'lee.sid',
    cookie: {
      maxAge: 99999999,
    }
  }))

  // 配置上传图片访问路径
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/'
  })


  await app.listen(3005);
}
bootstrap();
