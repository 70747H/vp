import {
  Controller,
  Post,
  Body,
  Patch,
  HttpCode,
  Query,
  Get,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ConsumeVoucherDto } from './dto/consume-voucher.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { VouchersResponseDto } from './dto/list-vouchers-response.dto';
import Voucher from './entities/voucher.entity';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return this.vouchersService.create(createVoucherDto);
  }

  @Patch('consumption')
  @HttpCode(200)
  consume(@Body() consumeVoucherDto: ConsumeVoucherDto): Promise<number> {
    return this.vouchersService.consume(consumeVoucherDto);
  }

  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'email', required: false, type: String })
  async find(@Query('email') email?: string): Promise<VouchersResponseDto[]> {
    return await this.vouchersService.find(email);
  }
}
