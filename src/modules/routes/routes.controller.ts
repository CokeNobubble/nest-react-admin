import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { IPage } from 'src/interface';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  getRoutes(@Query('role') role: string) {
    console.log(role);
    return this.routesService.getRoutes(role);
  }

  @Get('menu')
  getMenu() {
    return this.routesService.getMenu();
  }

  @Get('icons')
  getIcon() {
    return this.routesService.getIcon();
  }

  @Post('addMenu')
  addMenu(@Body() route: CreateRouteDto) {
    console.log(route);
    return this.routesService.addMenu(route);
  }

  // 获取所有菜单表
  @Get('allRoutes')
  getAllRoutes(@Query() page: IPage) {
    console.log(page);
    return this.routesService.getAllRoutes(page);
  }

  // 更新菜单
  @Post('update')
  updateMenu(@Body() route: CreateRouteDto) {
    return this.routesService.updateMenu(route);
  }

  @Post('remove')
  removeMenu(@Body() id: number) {
    return this.routesService.removeMenu(id);
  }
}
