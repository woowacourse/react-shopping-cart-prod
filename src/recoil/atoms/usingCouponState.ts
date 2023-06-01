import { atom } from 'recoil';

import { MemberCouponType } from '@Types/index';

const usingCouponState = atom<MemberCouponType>({
  key: 'usingCouponState',
  default: { id: -999, name: '', discountAmount: 0, description: '', isUsed: false },
});

export default usingCouponState;
