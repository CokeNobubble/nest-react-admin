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

  @Post('/addMenu')
  addMenu(@Body() route: CreateRouteDto) {
    console.log(route);
    return this.routesService.addMenu(route);
  }
}
