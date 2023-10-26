import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class Rt_Department {
  @PrimaryGeneratedColumn()
  id: number;

  // 部门名称
  @Column()
  name: string;

  // 父级部门id
  @Column()
  pid: number;
}
