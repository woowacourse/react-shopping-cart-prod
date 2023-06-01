import { useRecoilState, useRecoilValue } from 'recoil';
import { couponsSelector, selectedCouponsState } from '../../../atoms/coupons';
import * as S from './AllCouponSelect.styles';
import { selectedCartItemIdsState } from '../../../atoms/cart';
import { useEffect } from 'react';

const AllCouponSelect = () => {
  const couponsState = useRecoilValue(couponsSelector);
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const selectedCartIds = useRecoilValue(selectedCartItemIdsState);

  useEffect(() => {
    if (selectedCartIds.size === 0) {
      setSelectedCoupons([]);
    }
  }, [selectedCartIds, setSelectedCoupons]);

  const onSelectedCouponsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'DEFAULT' || selectedCartIds.size === 0) {
      e.target.selectedIndex = 0;
      setSelectedCoupons([]);
      return;
    }
    const couponId = +e.target.value;
    setSelectedCoupons([couponId]);
  };
  return (
    <S.Select onChange={onSelectedCouponsChange}>
      <option defaultChecked value={'DEFAULT'}>
        쿠폰을 선택하세요.
      </option>
      {couponsState.allCoupons.map((coupon) => (
        <option
          key={coupon.id}
          value={coupon.id}
          selected={selectedCoupons.includes(coupon.id)}
        >
          {coupon.name}
        </option>
      ))}
    </S.Select>
  );
};

export default AllCouponSelect;
