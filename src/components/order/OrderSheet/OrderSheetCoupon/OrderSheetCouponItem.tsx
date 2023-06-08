import styled from 'styled-components';
import { COUPON_TYPE_UNIT } from '../../../../constant/common';
import type { Coupon } from '../../../../types/product';

interface OrderSheetCouponItemProps {
  coupon: Coupon;
  onChangeCoupon: (coupon: Coupon) => void;
}
const OrderSheetCouponItem = ({
  coupon,
  onChangeCoupon,
}: OrderSheetCouponItemProps) => {
  const { amount, name, type } = coupon;

  const amountWithType = `${amount}${COUPON_TYPE_UNIT[type]}`;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    onChangeCoupon(coupon);
  };

  return (
    <CouponItemContaier>
      <input type="radio" name="coupon" onChange={handleChange} />
      <div>
        <Amount>{amountWithType}</Amount>
        <Name>{name}</Name>
      </div>
    </CouponItemContaier>
  );
};

const CouponItemContaier = styled.label`
  display: flex;
  gap: 10px;

  width: 100%;
`;

const Amount = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const Name = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: rgb(130, 140, 148);
`;

export default OrderSheetCouponItem;
