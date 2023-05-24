import { Test, TestingModule } from '@nestjs/testing';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { vouchers as mockedVouchers } from '../../test/mocks/vouchers-res';

describe('VouchersController', () => {
  let controller: VouchersController;

  const mockVoucherService = {
    find: jest.fn().mockImplementation(() => mockedVouchers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouchersController],
      providers: [VouchersService],
    })
      .overrideProvider(VouchersService)
      .useValue(mockVoucherService)
      .compile();

    controller = module.get<VouchersController>(VouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of vouchers', async () => {
    const actual = await controller.find();
    expect(actual).toEqual(mockedVouchers);
  });
});
