import { Module } from '@nestjs/common';
import { DeptMagService } from './dept-mag.service';
import { DeptMagController } from './dept-mag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_DeptMag } from './entities/dept-mag.entity';
import { Rt_Users } from '../register/entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_DeptMag, Rt_Users])],
  controllers: [DeptMagController],
  providers: [DeptMagService],
})
export class DeptMagModule {}
