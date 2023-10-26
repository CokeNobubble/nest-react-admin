import { Module } from '@nestjs/common';
import { DepartmentMagService } from './department-mag.service';
import { DepartmentMagController } from './department-mag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Department } from './entities/department-mag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_Department])],
  controllers: [DepartmentMagController],
  providers: [DepartmentMagService],
})
export class DepartmentMagModule {}
