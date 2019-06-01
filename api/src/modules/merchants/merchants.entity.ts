import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true })
  userId: string

  @Column({ nullable: true })
  name: string

  @Column({ default: false })
  isReseller: boolean

  @Column({ nullable: true })
  resellerId: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  state: string

  @Column({nullable:true})
  city: string

  @Column({nullable: true})
  address: string

  @Column({nullable:true})
  zipCode: string

  @Column({default:false})
  deleted: boolean
}
