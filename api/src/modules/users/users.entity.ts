import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Reseller } from '../resellers/resellers.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ unique: true, length: 100 })
  email: string

  @Column({ default: false })
  emailConfirmed: boolean

  @Column({ nullable: true })
  password: string

  @Column()
  merchantId: string

  @Column('simple-json', { name: 'profile' })
  profile: {
    firstName: string
    lastName: string
  }

  @Column({ default: true })
  active: boolean

  @OneToMany(type => Reseller, reseller => reseller.user)
  resellers: Reseller[]
}
