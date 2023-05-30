import styled from '@emotion/styled';
import type { CouponType } from '../../../types/types';

import { Text } from '../../common/Text/Text';
import { PERCENTAGE } from '../../../abstract/constants';

interface UserCouponItemProps {
  totalPrice: number;
  coupon: CouponType;
}
const UserCouponItem = ({ totalPrice, coupon }: UserCouponItemProps) => {
  const minimum = coupon.minimum_price ? `${coupon.minimum_price}원 이상 구매시 적용가능` : '';

  const available = coupon.minimum_price < totalPrice;
  return (
    <CouponItemWrapper>
      <Text color="#000000" size="small" weight="normal" lineHeight="20px">
        {coupon.name}
      </Text>
      <Text color="#000000" size="smallest" weight="light" lineHeight="20px">
        {minimum}
      </Text>
      {available ? (
        <Text color="#2a00d1" size="small" weight="bold" lineHeight="20px">
          사용가능
        </Text>
      ) : (
        <Text color="#c20000" size="small" weight="bold" lineHeight="20px">
          사용불가
        </Text>
      )}
    </CouponItemWrapper>
  );
};

export default UserCouponItem;

const CouponItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 1px;

  padding: 3px;
  border: 1px solid #000000;
  border-radius: 8px;
`;
