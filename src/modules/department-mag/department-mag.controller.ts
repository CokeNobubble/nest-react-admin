import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentMagService } from './department-mag.service';
import { CreateDepartmentMagDto } from './dto/create-department-mag.dto';
import { UpdateDepartmentMagDto } from './dto/update-department-mag.dto';

@Controller('department')
export class DepartmentMagController {
  constructor(private readonly departmentMagService: DepartmentMagService) {}

  @Post()
  create(@Body() createDepartmentMagDto: CreateDepartmentMagDto) {
    return this.departmentMagService.create(createDepartmentMagDto);
  }

  @Get()
  findAll() {
    return this.departmentMagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentMagService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentMagDto: UpdateDepartmentMagDto,
  ) {
    return this.departmentMagService.update(+id, updateDepartmentMagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentMagService.remove(+id);
  }
}
