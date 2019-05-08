import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  OneToOne,
} from 'typeorm'
import { Reseller } from '../resellers/resellers.entity'
import { User } from '../users/users.entity'

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: false })
  @Index()
  name: string

  @ManyToOne(type => Reseller, reseller => reseller.merchants)
  reseller: Reseller

  @ManyToOne(type => User, user => user.merchants, { nullable: false })
  user: User
}
