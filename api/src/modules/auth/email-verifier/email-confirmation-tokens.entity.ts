import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('emailConfirmationTokens')
export class EmailConfirmationToken {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  userId: string

  @Generated('uuid')
  @Column()
  token: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: Date
}
