import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Users } from '../register/entities/register.entity';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthStrategy from './jwt-auth.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([Rt_Users]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn }
  })],
  controllers: [LoginController],
  providers: [LoginService, JwtAuthStrategy]
})
export class LoginModule { }
