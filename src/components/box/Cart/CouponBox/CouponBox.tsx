import styled from '@emotion/styled';
import { Text } from '../../../common/Text/Text';
import Button from '../../../common/Button/Button';
import { useCartFetch } from '../../../../hooks/useCartFetch';
import useCoupon from '../../../../hooks/useCoupon';
import { useEffect, useState } from 'react';
import { useModal } from '../../../../hooks/useModal';
import { appliedCouponState, couponListModalState } from '../../../../service/atom';
import { useRecoilValue } from 'recoil';

const CouponBox = () => {
  const { calcTotalPrice } = useCartFetch();
  const { couponData } = useCoupon('my');

  const appliedCoupon = useRecoilValue(appliedCouponState);

  const [usable, setUsable] = useState<boolean>(false);
  const { openModal } = useModal(couponListModalState);

  useEffect(() => {
    console.log(calcTotalPrice);
    console.log(couponData);
    if (couponData) {
      const check = couponData.filter((coupon) => coupon.minimumPrice <= calcTotalPrice);
      if (check.length > 0) {
        setUsable(true);
        return;
      }
      setUsable(false);
    }
  }, [couponData, calcTotalPrice]);

  return (
    <CouponBoxWrapper>
      <CartListHead>
        <Text size="small" weight="light">
          쿠폰/할인
        </Text>
      </CartListHead>
      <CouponBoxInner>
        <Text
          size="smaller"
          weight="light"
          color={appliedCoupon ? 'rgb(255, 64, 62)' : usable ? '#07c09e' : 'rgb(177, 179, 181)'}
        >
          {appliedCoupon
            ? appliedCoupon.discountType === 'deduction'
              ? '-' + appliedCoupon.discountAmount.toLocaleString() + '원 할인 적용중'
              : '-' +
                (calcTotalPrice * appliedCoupon.discountRate).toLocaleString() +
                '원 할인 적용중'
            : usable
            ? '사용 가능한 쿠폰이 있습니다.'
            : '사용 가능한 쿠폰이 없습니다.'}
        </Text>
        <Button
          size="small"
          text="확인하기"
          isValid={usable && calcTotalPrice > 0}
          onClick={() => openModal({})}
        />
      </CouponBoxInner>
    </CouponBoxWrapper>
  );
};

export default CouponBox;

const CouponBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartListHead = styled.div`
  width: 100%;
  border-bottom: 3px solid #aaa;
  padding: 80px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 70px;
  background-color: #fff;
  z-index: 30;
`;

const CouponBoxInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
