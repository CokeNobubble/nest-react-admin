import { Module, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { VerificationCodeModule } from './modules/verification-code/verification-code.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { UserListModule } from './modules/user-list/user-list.module';
import { UserAvatarModule } from './modules/user-avatar/user-avatar.module';
import { MysqlConfigModule } from './common/mysql/config';
import { RoutesModule } from './modules/routes/routes.module';
import { IconsModule } from './modules/icons/icons.module';
import { DepartmentMagModule } from './modules/department-mag/department-mag.module';

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    VerificationCodeModule,
    MysqlConfigModule,
    UserListModule,
    UserAvatarModule,
    RoutesModule,
    IconsModule,
    DepartmentMagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
