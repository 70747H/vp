import Voucher from '../../vouchers/entities/voucher.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export default class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal', scale: 2, name: 'discount_percentage' })
  discountPercentage: number;

  @OneToMany(() => Voucher, (voucher) => voucher.offer)
  vouchers?: Voucher[];
}
