import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rt_Routes } from './entities/routes.entity';
import { CreateRouteDto } from './dto/create-route.dto';

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
    console.log(findRoutes, 'findRoutes');
    const routeTree = this.formatRouterTree(findRoutes);
    return routeTree;
  }

  // 处理路由变成tree结构
  formatRouterTree(routes: Rt_Routes[]) {
    const parentRoutes = routes.filter((route) => route.pid === 0);
    const childrenRoutes = routes.filter((route) => route.pid !== 0);

    dataToTree(parentRoutes, childrenRoutes);

    function dataToTree(parents, children) {
      parents.map((p) => {
        children.map((c, i) => {
          if (p.id == c.pid) {
            let _c = JSON.parse(JSON.stringify(children));
            // 删除已经处理过的
            _c.splice(i, 1);
            // 删除过的作为父路由，其余的作为子路由 继续递归处理
            dataToTree([c], _c);

            //   第一次调用p.children等于undefine 走else 如果p.children存在了 就可以直接push了
            if (p.children) {
              p.children.push(c);
            } else {
              p.children = [c];
            }
          }
        });
      });
    }
    return parentRoutes;
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
    // console.log(routes);
    return this.routes.save(route);
  }

  // 找出路由表中存在的属性值
  findCommonProp(routes: Rt_Routes[], prop: string, value: string) {
    const findRes = routes.find((route) => route[prop] === value);
    return findRes;
  }
}
