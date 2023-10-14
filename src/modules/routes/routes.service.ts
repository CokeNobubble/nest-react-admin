import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rt_Routes } from './entities/routes.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Rt_Routes) private readonly routes: Repository<Rt_Routes>,
  ) {}

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
}
