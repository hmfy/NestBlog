import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DemoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  bg: string

  @Column()
  desc: string
}
