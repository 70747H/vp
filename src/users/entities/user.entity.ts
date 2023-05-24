import Voucher from '../../vouchers/entities/voucher.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Voucher, (voucher) => voucher.user)
  vouchers: Voucher[];
}
