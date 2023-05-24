import { generateUUID } from '../../src/utils/uuid';

export const vouchers = [
  {
    id: 1,
    code: 'vhLTR5xzbvlq5LRwt0vHk',
    isUsed: null,
    expireAt: '2023-05-16T20:58:52.160Z',
    usedAt: null,
    email: 'hassan@eaxmple.co',
    offerName: 'offer-50',
  },
];

export const voucherToCreateObject = {
  code: 'V1StGXR8_Z5jdHi6B-myT',
  expireAt: '2023-05-20T20:58:52.160Z',
  user: 1,
  offer: 1,
};

export const createdVoucher = {
  id: 1,
  code: 'V1StGXR8_Z5jdHi6B-myT',
  isUsed: null,
  expireAt: new Date('2023-05-16T20:58:52.160Z'),
  usedAt: null,
  user: { id: 1, name: '', email: '', vouchers: [] },
  offer: { id: 1, name: '', discountPercentage: 0.2, vouchers: [] },
};

export const consumedVoucherRes = 0.5;

export const consumedVoucher = {
  id: 1,
  code: 'V1StGXR8_Z5jdHi6B-myT',
  isUsed: true,
  expireAt: new Date(),
  usedAt: new Date(),
  user: { id: 1, name: '', email: '', vouchers: [] },
  offer: { id: 1, name: '', discountPercentage: 0.2, vouchers: [] },
};
