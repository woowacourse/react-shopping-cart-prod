import styled from '@emotion/styled';
import type { CouponType } from '../../../types/types';

import { Text } from '../../common/Text/Text';

interface UserCouponItemProps {
  totalPrice: number;
  coupon: CouponType;
  isClicked: boolean;
  onClick: () => void;
}
const UserCouponItem = ({ totalPrice, coupon, isClicked, onClick }: UserCouponItemProps) => {
  const minimum = coupon.minimumPrice ? `${coupon.minimumPrice}원 이상 구매시 적용가능` : '';

  const available = coupon.minimumPrice < totalPrice;

  return (
    <CouponItemWrapper color={isClicked ? '#04C09E' : '#fff'} onClick={onClick}>
      <Text color="#000" size="small" weight="normal" lineHeight="20px">
        {coupon.name}
      </Text>
      <Text color="#000" size="smallest" weight="light" lineHeight="20px">
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

  cursor: pointer;
  background-color: ${(props) => props.color};
  border: 1px solid #000;
  border-radius: 8px;
`;
