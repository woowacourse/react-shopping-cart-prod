import styled from '@emotion/styled';
import { CouponType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import { PERCENTAGE } from '../../../abstract/constants';

const CouponItem = ({ coupon }: { coupon: CouponType }) => {
  const discount =
    coupon.discountType === PERCENTAGE
      ? `${coupon.discountRate * 100}%`
      : `${coupon.discountAmount}원`;

  const minimum = coupon.minimumPrice ? `${coupon.minimumPrice}원 이상 구매시 적용가능` : '';
  return (
    <CouponItemWrapper>
      <Text color="#FFFFFF" size="small" weight="normal">
        {coupon.name}
      </Text>
      <Text color="#FFFFFF" size="largest" weight="bold" lineHeight="58px">
        {discount} 할인
      </Text>
      <Text color="#FFFFFF" size="small" weight="light">
        {minimum}
      </Text>
    </CouponItemWrapper>
  );
};

export default CouponItem;

const CouponItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 176px;
  gap: 6px;

  padding: 23px 16px 16px 16px;
  background-color: #414141;
  @media screen and (max-width: 1000px) {
    width: 350px;
  }

  @media screen and (max-width: 660px) {
    width: 100%;
  }
`;
