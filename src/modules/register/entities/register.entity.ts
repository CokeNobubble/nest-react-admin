
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm"

@Entity()
export class Rt_Users {
    @PrimaryGeneratedColumn()
    id: number


    @Column()
    username: string

    @Column()   // { select: false }  查询时不将此列查出
    password: string

    @Column({ default: null })
    nickname: string

    @Column({ default: "男" })
    sex: string

    @Column({ default: null })
    phone: string

    @Column({ default: null })
    user_pic: string

    @Column({ default: null })
    desc: string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date
}
