import { SetMetadata } from "@nestjs/common";


// 是否为公共接口 导出自定义装饰器
export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);