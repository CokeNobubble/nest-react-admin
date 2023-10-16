import { Module } from '@nestjs/common';
import { IconsService } from './icons.service';
import { IconsController } from './icons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './entities/icon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Icon])],
  controllers: [IconsController],
  providers: [IconsService],
})
export class IconsModule {}
