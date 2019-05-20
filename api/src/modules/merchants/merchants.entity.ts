import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column({ default: false })
  isReseller: boolean

  @Column({ nullable: true })
  resellerId: string

  @Column('simple-json', { name: 'contactInfo', nullable: true })
  contactInfo: {
    phone: string
    address: {
      country: string,
      state: string,
      city: string,
      address: string,
      zipCode: string,

    }
  }
}
