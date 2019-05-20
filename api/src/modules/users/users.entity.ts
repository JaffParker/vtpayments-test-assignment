import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Merchant } from './../merchants/merchants.entity'

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

  @ManyToOne(() => Merchant, null, { nullable: true })
  merchant: Merchant;

  @Column('simple-json', { name: 'profile' })
  profile: {
    firstName: string
    lastName: string
  }

  @Column({ default: true })
  active: boolean
}
