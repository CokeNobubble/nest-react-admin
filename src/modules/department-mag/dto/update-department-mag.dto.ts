import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentMagDto } from './create-department-mag.dto';

export class UpdateDepartmentMagDto extends PartialType(CreateDepartmentMagDto) {}
