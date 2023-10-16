import { Injectable } from '@nestjs/common';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Icon } from './entities/icon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IconsService {
  constructor(
    @InjectRepository(Icon) private readonly icons: Repository<Icon>,
  ) {}

  create(createIconDto: CreateIconDto) {
    return 'This action adds a new icon';
  }

  findAll() {
    return `This action returns all icons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} icon`;
  }

  update(id: number, updateIconDto: UpdateIconDto) {
    return `This action updates a #${id} icon`;
  }

  remove(id: number) {
    return `This action removes a #${id} icon`;
  }

  // 获取图标列表
  async getIcons() {
    const iconList = await this.icons.find();
    return iconList;
  }
}
