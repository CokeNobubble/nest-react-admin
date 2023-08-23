import { Controller, Post, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
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
}
