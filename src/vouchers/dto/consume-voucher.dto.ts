import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UserExistsRule } from '../../decorators/user-exists.decorator';
import { VoucherCodeAlreadyUsedRule } from '../../decorators/voucher-already-used.decorator';
import { VoucherCodeExistsRule } from '../../decorators/voucher-code-exists.decorator';

export class ConsumeVoucherDto {
  @IsNotEmpty()
  @IsString()
  @Validate(VoucherCodeExistsRule)
  @Validate(VoucherCodeAlreadyUsedRule)
  code: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(UserExistsRule)
  email: string;
}
