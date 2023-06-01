import { useRecoilState, useRecoilValue } from 'recoil';
import { couponsSelector, selectedCouponsState } from '../../../atoms/coupons';

const AllSelect = () => {
  const couponsState = useRecoilValue(couponsSelector);
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);

  const onSelectedCouponsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const couponId = +e.target.value;
    setSelectedCoupons([couponId]);
  };
  return (
    <select onChange={onSelectedCouponsChange}>
      <option defaultChecked>쿠폰을 선택하세요.</option>
      {couponsState.allCoupons.map((coupon) => (
        <option
          key={coupon.id}
          value={coupon.id}
          selected={selectedCoupons.includes(coupon.id)}
        >
          {coupon.name}
        </option>
      ))}
    </select>
  );
};

export default AllSelect;
