import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rt_Users } from 'src/modules/register/entities/register.entity';

@Entity()
export class Rt_DeptMag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pid: number;

  @OneToMany(() => Rt_Users, (user) => user.rtDepartmentId)
  deptUser: Rt_Users[];
}
