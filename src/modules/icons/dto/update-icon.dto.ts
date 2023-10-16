import { PartialType } from '@nestjs/mapped-types';
import { CreateIconDto } from './create-icon.dto';

export class UpdateIconDto extends PartialType(CreateIconDto) {}
