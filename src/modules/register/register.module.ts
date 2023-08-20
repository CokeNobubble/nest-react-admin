import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Users } from './entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_Users])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {

}
