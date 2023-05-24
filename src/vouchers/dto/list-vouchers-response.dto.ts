export class VouchersResponseDto {
  id: number;
  code: string;
  isUsed: boolean;
  expireAt: Date;
  usedAt: Date;
  email: string;
  offerName: string;
}