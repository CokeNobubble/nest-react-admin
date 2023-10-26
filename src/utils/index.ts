function arrayToTree<T>(data: T[] | any) {
  const parentRoutes = data.filter((item) => item.pid === 0);
  const childrenRoutes = data.filter((item) => item.pid !== 0);

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

function capitalCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { arrayToTree, capitalCase };
