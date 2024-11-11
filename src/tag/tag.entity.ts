import {Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true
    })
    name: string
}
