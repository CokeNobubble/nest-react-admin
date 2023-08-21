import { Injectable } from '@nestjs/common';
import { CreateUserAvatarDto } from './dto/create-user-avatar.dto';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_Users } from '../register/entities/register.entity';
import { Repository } from 'typeorm';
import jwt_decode from "jwt-decode"

interface IUser {
  username: string,
  iat: number,
  exp: number,
  id: number
}

@Injectable()
export class UserAvatarService {
  constructor(@InjectRepository(Rt_Users) private readonly user: Repository<Rt_Users>) { }

  async uploadAvatar(file: Express.Multer.File, token: string) {
    const decode: IUser = jwt_decode(token)
    await this.user.update(decode.id, { user_pic: file.filename })
    return "上传成功"
  }


  create(createUserAvatarDto: CreateUserAvatarDto) {
    return 'This action adds a new userAvatar';
  }

  findAll() {
    return `This action returns all userAvatar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAvatar`;
  }

  update(id: number, updateUserAvatarDto: UpdateUserAvatarDto) {
    return `This action updates a #${id} userAvatar`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAvatar`;
  }
}
