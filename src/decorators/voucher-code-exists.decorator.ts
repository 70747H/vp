import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import Voucher from '../vouchers/entities/voucher.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'VoucherCodeExists', async: true })
@Injectable()
export class VoucherCodeExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}
  async validate(value: string): Promise<boolean> {
    try {
      await this.voucherRepository.findOneOrFail({
        where: { code: value },
      });
    } catch (error) {
      return false;
    }
    return true;
  }
  defaultMessage?(): string {
    return `Voucher doesn't exist.`;
  }
}
