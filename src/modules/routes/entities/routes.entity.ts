import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Rt_Routes {
  @PrimaryGeneratedColumn()
  id: number; // 路由id

  @Column()
  pid: number; // 父级id

  @Column({unique:true})
  path: string; // 路由地址

  @Column({ default: null ,unique:true})
  title: string; // 路由标题

  @Column({ default: null,unique:true })
  icon: string; // 路由图标

  @Column({ default: null,unique:true })
  component: string; // 路由组件

  @Column('simple-array')
  permission: string[]; // 权限标识
}
