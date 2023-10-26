import { Rt_Department } from 'src/modules/department-mag/entities/department-mag.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

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
  @Column({ type: 'varchar', default: 'common' })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @ManyToOne(() => Rt_Department, (rt_Department) => rt_Department.id)
  rt_Department: Rt_Department;
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
