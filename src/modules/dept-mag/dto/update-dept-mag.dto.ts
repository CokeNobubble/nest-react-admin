import { PartialType } from '@nestjs/mapped-types';
import { CreateDeptMagDto } from './create-dept-mag.dto';

export class UpdateDeptMagDto extends PartialType(CreateDeptMagDto) {}
