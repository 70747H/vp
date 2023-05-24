import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { OffersModule } from './offers/offers.module';
import { typeOrmConfig } from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    VouchersModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
