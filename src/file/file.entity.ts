import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  path: string

  @CreateDateColumn({
    type: 'datetime'
  })
  createTime: string
}
