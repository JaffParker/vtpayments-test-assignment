import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Merchant } from 'src/modules/merchants/merchants.entity'
import { User } from '../users/users.entity'

@Entity('resellers')
export class Reseller {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true })
  name: string

  @OneToMany(type => Merchant, merchant => merchant.reseller)
  merchants: Merchant[]

  @ManyToOne(type => User, user => user.resellers)
  user: User
}
