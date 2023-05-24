import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoucherDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  offer: number;

  @IsNotEmpty()
  @IsISO8601()
  expireAt: string;
}
