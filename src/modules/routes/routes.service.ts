import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rt_Routes } from './entities/routes.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { arrayToTree, capitalCase } from 'src/utils';
import { IPage } from 'src/interface';

type Icons = {
  icon: string;
};

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Rt_Routes) private readonly routes: Repository<Rt_Routes>,
  ) {}

  // 获取路由表
  async getRoutes(role: string) {
    const routes = await this.routes.find();
    const findRoutes = routes.filter((route) =>
      route.permission.includes(role),
    );
    // 循环 findRoutes 后 通过pid递归处理  变成tree结构
    const routeTree = arrayToTree<Rt_Routes>(findRoutes);
    return routeTree;
  }

  async getMenu() {
    const routes = await this.routes.find();
    return routes;
  }

  // 获取图标列表
  async getIcon() {
    // 单独查询某列（icon这一列）
    const icons: Icons[] = await this.routes
      .createQueryBuilder('route')
      .select('icon')
      .getRawMany();
    console.log(icons);
    const res = icons.filter((item) => item.icon !== null);
    return res;
  }

  // 添加路由菜单
  async addMenu(route: CreateRouteDto) {
    const obj = JSON.parse(JSON.stringify(route));
    delete obj.pid;
    delete obj.permission;
    const routes = await this.routes.find();
    for (const key in obj) {
      const res = this.findCommonProp(routes, key, obj[key]);
      if (res) throw new BadRequestException('该路由已存在');
    }
    route.component = capitalCase(route.component);
    return this.routes.save(route);
  }

  // 找出路由表中存在的属性值
  findCommonProp(routes: Rt_Routes[], prop: string, value: string) {
    const findRes = routes.find((route) => route[prop] === value);
    return findRes;
  }

  async getAllRoutes(page: IPage) {
    const routes = await this.routes.find({
      take: Number(page.size),
      skip: (Number(page.current) - 1) * Number(page.size),
    });
    const total = await this.routes.count({});
    return {
      list: routes,
      page: {
        size: Number(page.size),
        total,
        current: Number(page.current),
      },
    };
  }

  // 更新菜单
  async updateMenu(route: CreateRouteDto) {
    console.log(route);
    return this.routes.update(route.id, route);
  }

  // 删除菜单
  async removeMenu(id: number) {
    return await this.routes.delete(id);
  }
}
