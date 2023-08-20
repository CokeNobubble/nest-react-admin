import { Controller, Post, Body, Session } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Public()
  @Post("/register")
  register(@Body() createRegisterDto: CreateRegisterDto, @Session() session) {
    return this.registerService.register(createRegisterDto, session);
  }
}
