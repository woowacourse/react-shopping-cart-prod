import * as S from './AllCouponSelect.styles';
import useAllCouponSelect from '../../../hooks/useAllCouponSelect';

const AllCouponSelect = () => {
  const { couponsState, selectedCoupons, onSelectedCouponsChange } =
    useAllCouponSelect();
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
