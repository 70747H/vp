import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import Voucher from '../vouchers/entities/voucher.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'VoucherCodeAlreadyUsed', async: true })
@Injectable()
export class VoucherCodeAlreadyUsedRule
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}
  async validate(code: string): Promise<boolean> {
    try {
      await this.voucherRepository.findOneOrFail({
        where: { code, isUsed: true },
      });
    } catch (error) {
      return true;
    }
    return false;
  }
  defaultMessage?(): string {
    return `Voucher already used.`;
  }
}
