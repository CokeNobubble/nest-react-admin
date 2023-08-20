import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { Rt_Users } from '../register/entities/register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from "bcryptjs"
import { JwtService } from "@nestjs/jwt"


export interface JwtPayload {
  username: string
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Rt_Users) private readonly user: Repository<Rt_Users>,
    private readonly jwtService: JwtService
  ) { }
  async login(loginData: LoginDto, session) {
    const findUser = await this.user.findOne({
      where: { username: loginData.username }
    })
    // 如果没有该用户
    if (!findUser) throw new BadRequestException("用户不存在")

    if (session.code !== loginData.captcha.toUpperCase()) throw new BadRequestException("验证码错误")
    // 密码不正确
    const compareRes = bcryptjs.compareSync(loginData.password, findUser.password)
    if (!compareRes) throw new BadRequestException("密码不正确")
    const payload = { username: findUser.username }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
