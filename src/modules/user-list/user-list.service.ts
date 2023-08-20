import { Injectable } from '@nestjs/common';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_Users } from '../register/entities/register.entity';
import { Like, Repository } from 'typeorm';
import jwt_decode from "jwt-decode"; // 解析token
import { IUserListParams } from "./user-list.controller"

export interface IUser {
  username: string,
  iat: number,
  exp: number
}

@Injectable()
export class UserListService {
  constructor(@InjectRepository(Rt_Users) private readonly user: Repository<Rt_Users>) { }
  create(createUserListDto: CreateUserListDto) {
    return 'This action adds a new userList';
  }

  async findAll(query: IUserListParams) {
    const findAll = await this.user.find({
      where: {
        username: Like(`%${query.keyword}%`)
      },
      skip: (query.current - 1) * query.size,
      take: Number(query.size),
      order: {
        id: "DESC"
      }
    })
    const total = await this.user.count({
      where: {
        username: Like(`%${query.keyword}%`)
      }
    })
    const userList = findAll.map(user => {
      delete user.password
      return user
    })
    return {
      list: userList,
      page: {
        size: Number(query.size),
        total,
        current: Number(query.current)
      }
    };
  }

  async findOne(token: string) {
    const decode: IUser = jwt_decode(token)
    const findUser = await this.user.findOne({ where: { username: decode.username } })
    delete findUser.password
    return findUser;
  }

  async update(id: number, updateUserListDto: UpdateUserListDto) {
    this.user.update(id, updateUserListDto)
    return `更新成功`;
  }

  async remove(id: number) {
    await this.user.delete(id)
    return `删除成功`;
  }
}
