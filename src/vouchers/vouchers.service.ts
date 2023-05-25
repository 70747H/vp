import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { generateUUID } from '../utils/uuid';
import { ConsumeVoucherDto } from './dto/consume-voucher.dto';
import { VouchersResponseDto } from './dto/list-vouchers-response.dto';
import { VouchersRepository } from './vouchers.repository';
import Voucher from './entities/voucher.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VouchersService {
  private readonly logger = new Logger(VouchersService.name);

  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: VouchersRepository,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    try {
      const { user, offer, expireAt } = createVoucherDto;

      return await this.voucherRepository.save({
        code: generateUUID(),
        user: { id: user },
        offer: { id: offer },
        expireAt,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async consume(consumeVoucherDto: ConsumeVoucherDto): Promise<number> {
    try {
      const { code } = consumeVoucherDto;
      this.voucherRepository.update(
        { code },
        { isUsed: true, usedAt: new Date().toISOString() },
      );
      return (
        await this.voucherRepository.findOne({
          where: { code },
          relations: ['offer'],
        })
      ).offer.discountPercentage;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }

  find(email?: string): Promise<VouchersResponseDto[]> {
    return this.voucherRepository.findVouchersWithUsersAndOffers(email);
  }
}
