import { Module } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { UserListController } from './user-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rt_Roles, Rt_Users } from '../register/entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt_Users, Rt_Roles])],
  controllers: [UserListController],
  providers: [UserListService],
})
export class UserListModule {}
