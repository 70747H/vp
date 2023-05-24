import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offer from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [],
  providers: [],
})
export class OffersModule {}
