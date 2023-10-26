import { Injectable } from '@nestjs/common';
import { CreateDepartmentMagDto } from './dto/create-department-mag.dto';
import { UpdateDepartmentMagDto } from './dto/update-department-mag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rt_Department } from './entities/department-mag.entity';
import { Repository } from 'typeorm';
import { arrayToTree } from 'src/utils';

@Injectable()
export class DepartmentMagService {
  constructor(
    @InjectRepository(Rt_Department)
    private readonly departmentMag: Repository<Rt_Department>,
  ) {}
  async create(createDepartmentMagDto: CreateDepartmentMagDto) {
    await this.departmentMag.save(createDepartmentMagDto);
    return '添加部门成功!';
  }

  async findAll() {
    const findDept = await this.departmentMag.find();
    const tree = arrayToTree<Rt_Department>(findDept);
    return tree;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmentMag`;
  }

  update(id: number, updateDepartmentMagDto: UpdateDepartmentMagDto) {
    return `This action updates a #${id} departmentMag`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmentMag`;
  }
}
