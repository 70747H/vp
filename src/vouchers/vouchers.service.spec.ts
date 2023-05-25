import { Test, TestingModule } from '@nestjs/testing';
import { VouchersService } from './vouchers.service';
import {
  vouchers as mockedVouchers,
  voucherToCreateObject as mockedVoucher,
  createdVoucher,
  consumedVoucher,
} from '../../test/mocks/vouchers-res';
import { mock } from 'jest-mock-extended';
import { VouchersRepository } from './vouchers.repository';
import { ConsumeVoucherDto } from './dto/consume-voucher.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import Voucher from './entities/voucher.entity';
import { UpdateResult } from 'typeorm';

const repositoryMock = mock<VouchersRepository>();

describe('VouchersService', () => {
  let service: VouchersService;
  let repo: VouchersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VouchersService,
        {
          provide: getRepositoryToken(Voucher),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<VouchersService>(VouchersService);
    repo = module.get<VouchersRepository>(getRepositoryToken(Voucher));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('VoucherService.find()', () => {
    it('should return array of vouchers', async () => {
      repositoryMock.findVouchersWithUsersAndOffers.mockResolvedValue(
        mockedVouchers,
      );
      const actual = await service.find();
      expect(actual).toEqual(mockedVouchers);
    });
  });

  describe('VoucherService.create()', () => {
    it('should create', async () => {
      repositoryMock.save.mockResolvedValue(createdVoucher);
      const actual = await service.create(mockedVoucher);
      expect(actual.code).toEqual(createdVoucher.code);
      expect(actual).toHaveProperty('user');
      expect(actual).toHaveProperty('offer');
    });
  });

  describe('VoucherService.consume()', () => {
    it('should consume', async () => {
      const consumeVoucherDto: ConsumeVoucherDto = {
        code: 'V1StGXR8_Z5jdHi6B-myT',
        email: 'hassan@eaxmple.co',
      };
      repositoryMock.update.mockResolvedValue({
        raw: '',
        affected: 1,
        generatedMaps: [{}],
      });
      repositoryMock.findOne.mockResolvedValueOnce(consumedVoucher);
      const actual = await service.consume(consumeVoucherDto);
      expect(repo.update).toHaveBeenCalledTimes(1);
      expect(repo.findOne).toHaveBeenCalledTimes(1);
      expect(typeof actual).toBe('number');
    });
  });
});
