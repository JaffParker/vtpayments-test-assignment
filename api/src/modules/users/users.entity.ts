import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Reseller } from '../resellers/resellers.entity'
import { Merchant } from '../merchants/merchants.entity'

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

  @Column('simple-json', { name: 'profile' })
  profile: {
    firstName: string
    lastName: string
  }

  @OneToMany(type => Reseller, reseller => reseller.user)
  resellers: Reseller[]

  @OneToMany(type => Merchant, merchant => merchant.user)
  merchants: Merchant[]

  @Column({ default: true })
  active: boolean
}
