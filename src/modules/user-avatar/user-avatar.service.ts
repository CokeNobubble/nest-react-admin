import { Injectable } from '@nestjs/common';
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
}
