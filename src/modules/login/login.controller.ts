import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }


  @Public()
  @Post('/login')
  login(@Body() loginData: LoginDto, @Session() session) {
    console.log(loginData);

    return this.loginService.login(loginData, session);
  }

}
