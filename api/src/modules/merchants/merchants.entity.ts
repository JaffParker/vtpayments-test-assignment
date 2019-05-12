import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Reseller } from '../resellers/resellers.entity'

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ unique: true })
  name: string

  @ManyToOne(type => Reseller, reseller => reseller.merchants)
  reseller: Reseller
}
