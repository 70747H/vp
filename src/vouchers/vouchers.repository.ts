import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Voucher from './entities/voucher.entity';

@Injectable()
export class VouchersRepository extends Repository<Voucher> {
  findVouchersWithUsersAndOffers(email?: string) {
    const query = this.createQueryBuilder('vouchers')
      .innerJoinAndSelect('users', 'users', 'vouchers.userId = users.id')
      .innerJoinAndSelect('offers', 'offers', 'vouchers.offerId = offers.id')
      .select([
        'vouchers.id AS id',
        'vouchers.code AS code',
        'vouchers.isUsed AS "isUsed"',
        'vouchers.expireAt AS "expireAt"',
        'vouchers.usedAt AS "usedAt"',
        'users.email AS email',
        'offers.name AS "offerName"',
      ]);

    if (!!email) query.where('users.email = :email', { email });

    return query.getRawMany();
  }
}
