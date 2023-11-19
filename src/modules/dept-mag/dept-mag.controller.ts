import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DeptMagService } from './dept-mag.service';
import { CreateDeptMagDto } from './dto/create-dept-mag.dto';
import { UpdateDeptMagDto } from './dto/update-dept-mag.dto';
import { query } from 'express';

@Controller('dept')
export class DeptMagController {
  constructor(private readonly deptMagService: DeptMagService) {}

  // 获取部门列表
  @Get()
  getDeptList() {
    return this.deptMagService.getDeptList();
  }

  // 获取部门下的人员
  @Get('userList')
  getDeptUser(@Query() query) {
    return this.deptMagService.getDeptUser(query);
  }

  // @Post()
  // create(@Body() createDeptMagDto: CreateDeptMagDto) {
  //   return this.deptMagService.create(createDeptMagDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deptMagService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeptMagDto: UpdateDeptMagDto) {
  //   return this.deptMagService.update(+id, updateDeptMagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deptMagService.remove(+id);
  // }
}
