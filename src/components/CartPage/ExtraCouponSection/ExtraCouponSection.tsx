import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allCouponsSelector,
  selectedCouponsState,
  selectedCouponState,
} from '../../../atoms/coupon';
import {
  ALL_COUPON_MAP_ID,
  NOT_SELECTED_VALUE,
} from '../../../constants/coupon';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { SpecificCoupon } from '../../../types/coupon';

import * as S from './ExtraCouponSection.styles';

const ExtraCouponSection = () => {
  const allCoupons = useRefreshableRecoilValue(allCouponsSelector);
  const selectedCoupon = useRecoilValue(selectedCouponState(ALL_COUPON_MAP_ID));

  const setSelectedCouponsState = useSetRecoilState(selectedCouponsState);

  const selectCoupon = (couponId: SpecificCoupon['id']) => {
    const targetCoupon = allCoupons?.find((coupon) => coupon.id === couponId);

    setSelectedCouponsState(
      targetCoupon ? new Map().set(ALL_COUPON_MAP_ID, targetCoupon) : new Map()
    );
  };

  return (
    <S.Root>
      <S.Title>추가 적용 쿠폰</S.Title>
      <S.TextWrapper>
        <S.Text>장바구니 할인쿠폰</S.Text>
        <select
          defaultValue={NOT_SELECTED_VALUE}
          value={selectedCoupon?.id ?? NOT_SELECTED_VALUE}
          onChange={({ target: { value } }) => selectCoupon(Number(value))}>
          <option value={NOT_SELECTED_VALUE}>선택 없음</option>
          {allCoupons?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </S.TextWrapper>
    </S.Root>
  );
};

export default ExtraCouponSection;
