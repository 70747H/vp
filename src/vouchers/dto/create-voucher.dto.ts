import { IsISO8601, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { OfferExistsRule } from 'src/decorators/offer-exists.decorator';
import { UserExistsRule } from 'src/decorators/user-exists.decorator';

export class CreateVoucherDto {
  @IsNotEmpty()
  @IsNumber()
  @Validate(UserExistsRule, { context: { key: 'id' } })
  user: number;

  @IsNotEmpty()
  @IsNumber()
  @Validate(OfferExistsRule)
  offer: number;

  @IsNotEmpty()
  @IsISO8601()
  expireAt: string;
}
