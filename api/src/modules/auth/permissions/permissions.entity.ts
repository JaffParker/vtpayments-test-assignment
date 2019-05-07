import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  description: string
}
