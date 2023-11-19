import { Injectable } from '@nestjs/common';
import { CreateDeptMagDto } from './dto/create-dept-mag.dto';
import { UpdateDeptMagDto } from './dto/update-dept-mag.dto';
import { arrayToTree } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_DeptMag } from './entities/dept-mag.entity';
import { Repository } from 'typeorm';
import { Rt_Users } from '../register/entities/register.entity';
import { IPage } from 'src/interface';

export interface IDeptUser extends IPage {
  deptId: number;
}

@Injectable()
export class DeptMagService {
  constructor(
    @InjectRepository(Rt_DeptMag) private readonly dept: Repository<Rt_DeptMag>,
    @InjectRepository(Rt_Users) private readonly user: Repository<Rt_Users>,
  ) {}

  async getDeptList() {
    const deptList: Rt_DeptMag[] = await this.dept.find();
    const data = arrayToTree(deptList);
    return data;
  }

  async getDeptUser(query: IDeptUser) {
    const result = await this.user.find({
      relations: ['rt_DeptMag'],
      where: { rtDepartmentId: Number(query.deptId) },
      skip: (Number(query.current) - 1) * Number(query.size),
      take: Number(query.size),
      order: {
        id: 'DESC',
      },
    });
    const userList = result.map((user) => {
      delete user.password;
      return user;
    });

    return {
      list: userList,
      page: {
        size: Number(query.size),
        total: result.length,
        current: Number(query.current),
      },
    };
  }

  // create(createDeptMagDto: CreateDeptMagDto) {
  //   return 'This action adds a new deptMag';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} deptMag`;
  // }

  // update(id: number, updateDeptMagDto: UpdateDeptMagDto) {
  //   return `This action updates a #${id} deptMag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} deptMag`;
  // }
}
