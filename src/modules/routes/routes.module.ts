import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Routes } from './entities/routes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_Routes])],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
