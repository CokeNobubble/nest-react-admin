FROM daocloud.io/library/node:16.18.0


RUN mkdir -p /app

# 复制当前代码到/app工作目录
COPY . ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/


# npm 安装依赖
RUN npm install


# 打包
RUN npm run build


CMD npm run start:prod

EXPOSE 9000