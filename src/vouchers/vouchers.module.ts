import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import Voucher from './entities/voucher.entity';
import { VoucherCodeExistsRule } from '../decorators/voucher-code-exists.decorator';
import { customVouchersRepository } from './vouchers.repository';
import { DataSource } from 'typeorm';
import { VoucherCodeAlreadyUsedRule } from 'src/decorators/voucher-already-used.decorator';
import { UserExistsRule } from 'src/decorators/user-exists.decorator';
import { UsersModule } from 'src/users/users.module';
import User from 'src/users/entities/user.entity';
import { OfferExistsRule } from 'src/decorators/offer-exists.decorator';
import Offer from 'src/offers/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, User, Offer]), UsersModule],
  controllers: [VouchersController],
  providers: [
    {
      provide: getRepositoryToken(Voucher),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Voucher)
          .extend(customVouchersRepository);
      },
    },
    VouchersService,
    VoucherCodeExistsRule,
    VoucherCodeAlreadyUsedRule,
    UserExistsRule,
    OfferExistsRule,
  ],
})
export class VouchersModule {}
