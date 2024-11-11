import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    path: string

    @CreateDateColumn({
        type: "datetime"
    })
    createTime: string

    /* file 的 pid 为父级的 id, folder 的 pid 为 null */
    @Column({
        nullable: true
    })
    pid: string

    /* 1 是 file, 2 是 folder */
    @Column("int")
    type: number
}
