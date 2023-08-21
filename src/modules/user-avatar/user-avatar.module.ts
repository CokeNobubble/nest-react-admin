import { Module } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
import { UserAvatarController } from './user-avatar.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Request } from 'express';
import { Rt_Users } from '../register/entities/register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../../images"),
      filename: (req: Request, file, callback) => {
        const filename = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, filename)
      }
    })
  }), TypeOrmModule.forFeature([Rt_Users])],
  controllers: [UserAvatarController],
  providers: [UserAvatarService]
})
export class UserAvatarModule { }
