import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Users, Rt_Roles } from './entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_Users, Rt_Roles])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
