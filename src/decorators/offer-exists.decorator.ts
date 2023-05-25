import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import Offer from 'src/offers/entities/offer.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class OfferExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async validate(id: number): Promise<boolean> {
    try {
      await this.offerRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      return false;
    }
    return true;
  }
  defaultMessage?(): string {
    return `Offer doesn't exist.`;
  }
}
