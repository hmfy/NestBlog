import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TagEntity} from "../tag/tag.entity";

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column("text")
    content: string

    @CreateDateColumn({
        type: "datetime"
    })
    createTime: string

    @Column()
    tag: string
}
