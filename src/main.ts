import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalResponse } from "./common/response/response"
import { HttpFilter } from "./common/filters/httpFilter"
import * as session from "express-session"
import * as cors from "cors"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  await app.listen(3005);
}
bootstrap();
