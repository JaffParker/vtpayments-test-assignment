import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Merchant } from '../merchants/merchants.entity'
import { User } from '../users/users.entity'

@Entity('resellers')
export class Reseller {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ unique: true, nullable: false })
  name: string

  @OneToMany(type => Merchant, merchant => merchant.reseller)
  merchants: Merchant[]

  @ManyToOne(type => User, user => user.resellers)
  user: User
}
