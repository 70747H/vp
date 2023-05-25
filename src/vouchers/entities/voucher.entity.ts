import Offer from '../../offers/entities/offer.entity';
import User from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vouchers')
@Index(['user', 'offer'], { unique: true })
export default class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true, default: false, name: 'is_used' })
  isUsed: boolean;

  @Column({ type: 'timestamp', name: 'expire_at', nullable: true })
  expireAt: Date;

  @Column({ type: 'timestamp', name: 'used_at', nullable: true })
  usedAt: Date;

  @ManyToOne(() => User, (user) => user.vouchers)
  user?: User;

  @ManyToOne(() => Offer, (offer) => offer.vouchers)
  offer?: Offer;
}
