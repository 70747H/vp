import Offer from 'src/offers/entities/offer.entity';
import User from 'src/users/entities/user.entity';
import { generateUUID } from 'src/utils/uuid';
import Voucher from 'src/vouchers/entities/voucher.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1683927259647 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.allSettled([
      queryRunner.manager.insert(User, [
        {
          name: 'Hassan',
          email: 'hassan@eaxmple.com',
        },
        {
          name: 'Hala',
          email: 'hala@example.com',
        },
      ]),
      queryRunner.manager.insert(Offer, [
        {
          name: 'offer-50',
          discountPercentage: 0.5,
        },
        {
          name: 'offer-70',
          discountPercentage: 0.7,
        },
      ]),
      queryRunner.manager.insert(Voucher, [
        {
          code: generateUUID(),
          expireAt: new Date().toISOString(),
          user: { id: 1 },
          offer: { id: 1 },
        },
      ]),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(
      'TRUNCATE TABLE users, offers, vouchers RESTART IDENTITY CASCADE;',
    );
  }
}
