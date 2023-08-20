import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query, ParseIntPipe } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';


export interface IUserListParams {
  keyword: string,
  size: number
  current: number
  total: number
}

@Controller('user')
export class UserListController {
  constructor(private readonly userListService: UserListService) { }

  @Post()
  create(@Body() createUserListDto: CreateUserListDto) {
    return this.userListService.create(createUserListDto);
  }

  @Get("/list")
  findAll(@Query() query: IUserListParams) {
    return this.userListService.findAll(query);
  }

  /**
   * 获取当前用户
   * @param headers 请求头信息
   * @returns 
   */
  @Get()
  findOne(@Headers() headers) {
    return this.userListService.findOne(headers["authorization"].slice(7));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserListDto) {
    return this.userListService.update(id, updateUserListDto);
  }

  @Delete('/remove')
  remove(@Body("id") id: number) {
    return this.userListService.remove(id);
  }
}
