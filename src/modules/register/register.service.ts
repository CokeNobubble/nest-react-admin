import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_Users } from './entities/register.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Rt_Users) private readonly user: Repository<Rt_Users>,
  ) {}
  async register(data: CreateRegisterDto, session) {
    if (data.captcha.toUpperCase() !== session.code) {
      throw new BadRequestException('验证码错误');
    }
    const findUser = await this.user.findOne({
      where: { username: data.username },
    });
    if (findUser && findUser.username === data.username) {
      throw new BadRequestException('用户已存在');
    }
    data.password = bcryptjs.hashSync(data.password, 10);
    await this.user.save(data);
    return '注册成功';
  }
}
