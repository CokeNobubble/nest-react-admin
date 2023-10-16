import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
