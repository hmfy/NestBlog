import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TalkEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    nickname: string

    @Column('uuid')
    parentId: string

    @CreateDateColumn({
        type: "datetime"
    })
    createTime: string

    @Column()
    content: string
}
