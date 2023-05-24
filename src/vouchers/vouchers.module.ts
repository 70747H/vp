import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Voucher from './entities/voucher.entity';
import { VoucherCodeExistsRule } from '../decorators/voucher-code-exists.decorator';
import { VouchersRepository } from './vouchers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  controllers: [VouchersController],
  providers: [VoucherCodeExistsRule, VouchersService, VouchersRepository],
})
export class VouchersModule {}
