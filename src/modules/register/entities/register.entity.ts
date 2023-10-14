import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

// 用户表
@Entity()
export class Rt_Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column() // { select: false }  查询时不将此列查出
  password: string;

  @Column({ default: null })
  nickname: string;

  @Column({ default: '男' })
  sex: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  user_pic: string;

  @Column({ default: null })
  desc: string;

  // 角色类型
  @Column({ default: 'common' })
  role: string;

  @Column('simple-array')
  roles: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}

// 角色表
@Entity()
export class Rt_Roles {
  @PrimaryGeneratedColumn()
  id: number;

  // admin common
  @Column()
  role_type: string;

  // 角色权限
  @Column()
  role_permission: string;
}

// 前端菜单路由表
