import {
  ALL_COUPON_MAP_ID,
  NOT_SELECTED_VALUE,
} from '../../../constants/coupon';
import { useAllCoupon } from '../../../hooks/coupon/coupon';

import * as S from './ExtraCouponSection.styles';

const ExtraCouponSection = () => {
  const { allCoupons, selectedCoupon, selectAllCoupon } =
    useAllCoupon(ALL_COUPON_MAP_ID);

  return (
    <S.Root>
      <S.Title>추가 적용 쿠폰</S.Title>
      <S.TextWrapper>
        <S.Text>장바구니 할인쿠폰</S.Text>
        <select
          defaultValue={NOT_SELECTED_VALUE}
          value={selectedCoupon?.id ?? NOT_SELECTED_VALUE}
          onChange={({ target: { value } }) => selectAllCoupon(Number(value))}>
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
