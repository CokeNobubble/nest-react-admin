import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
import { CreateUserAvatarDto } from './dto/create-user-avatar.dto';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'

@Controller('user')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) { }

  @Post('/uploadAvatar')
  @UseInterceptors(FileInterceptor("file"))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Headers() headers) {
    return this.userAvatarService.uploadAvatar(file, headers["authorization"].slice(7));
  }

  @Get()
  findAll() {
    return this.userAvatarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAvatarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAvatarDto: UpdateUserAvatarDto) {
    return this.userAvatarService.update(+id, updateUserAvatarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAvatarService.remove(+id);
  }
}
