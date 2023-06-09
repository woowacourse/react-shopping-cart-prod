import { atom } from 'recoil';

import { MemberCouponType } from '@Types/index';

const usingCouponState = atom<MemberCouponType>({
  key: 'usingCouponState',
  default: { id: null, name: '', discountAmount: 0, description: '', isUsed: false },
});

export default usingCouponState;
