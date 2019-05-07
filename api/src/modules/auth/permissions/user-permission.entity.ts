import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity('usersPermissions')
@Unique(['userId', 'permissionId'])
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  userId: string

  @Column()
  permissionId: string

  @Column('simple-json')
  options: Record<string, string | number | string[] | number[]>
}
