import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string
}
