import { Injectable } from '@nestjs/common';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_Users } from '../register/entities/register.entity';
import { Like, Repository } from 'typeorm';
import jwt_decode from "jwt-decode"; // 解析token
import { IUserListParams } from "./user-list.controller"
import * as ExcelJS from 'exceljs';
import { In } from 'typeorm';
import { strArrToNumArr } from 'src/utils/utils';
interface IUser {
  username: string,
  iat: number,
  exp: number,
  id: number
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
    const findUser = await this.user.findOne({ where: { id: decode.id } })
    console.log(decode);
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

  async exportExcel(ids: string[]) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("用户表sheet1") // 设置当前表名称

    const data: number[] = strArrToNumArr(ids) // 数据库id是number类型，我这里写一个方法去转为number类型的数组

    // 查询数据库,需要导出的数据,因为worksheet.addRows()方法接收一个二维数组
    const findRes = await this.user.find({
      where: { id: In(data) }
    })
    // 将数据进行转为二维数组，
    const list = findRes.map(item => {
      delete item.password
      delete item.user_pic
      return Object.values(item)
    })
    const headers = ["ID", "用户名", "用户昵称", "性别", "手机号", "描述", "创建时间"]
    // 添加表格表头 也就是Excel表的列
    worksheet.addRow(headers);
    // 添加表格数据
    worksheet.addRows(list)
    // 返回buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer
  }
}
