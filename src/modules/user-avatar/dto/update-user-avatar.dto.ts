import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAvatarDto } from './create-user-avatar.dto';

export class UpdateUserAvatarDto extends PartialType(CreateUserAvatarDto) {}
