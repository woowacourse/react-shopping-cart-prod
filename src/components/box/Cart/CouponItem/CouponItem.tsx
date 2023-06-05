import styled from '@emotion/styled';
import { CouponType } from '../../../../types/types';
import { Text } from '../../../common/Text/Text';

const CouponItem = ({
  coupon,
  isClicked,
  onClick,
  usable,
}: {
  coupon?: CouponType;
  isClicked: boolean;
  onClick?: () => void;
  usable: boolean;
}) => {
  const couponDiscount =
    coupon &&
    (coupon.discountType === 'deduction'
      ? coupon.discountAmount.toLocaleString() + '원'
      : coupon.discountRate * 100 + '%');

  return (
    <CouponItemWrapper isClicked={isClicked} onClick={usable ? onClick : undefined} usable={usable}>
      <CouponRadio isClicked={isClicked} usable={usable}>
        <CouponRadioInner isClicked={isClicked} usable={usable} />
      </CouponRadio>
      <CouponInfo>
        <Text size="smaller" weight="bold" color={usable ? '#414141' : 'rgb(177, 179, 181)'}>
          {coupon ? couponDiscount : '할인쿠폰 적용안함'}
        </Text>
        {coupon && (
          <>
            <Text size="smallest" weight="light" color={usable ? '#999' : 'rgb(177, 179, 181)'}>
              {coupon.name}
            </Text>
            <Text size="smallest" weight="light" color={usable ? '#999' : 'rgb(177, 179, 181)'}>
              {coupon.minimumPrice.toLocaleString()}원 이상 구매시 적용
            </Text>
          </>
        )}
      </CouponInfo>
    </CouponItemWrapper>
  );
};

export default CouponItem;

const CouponItemWrapper = styled.div<{ isClicked: boolean; usable: boolean }>`
  width: 100%;
  padding: 20px 28px;
  min-height: 56px;
  border-radius: 4px;
  border: 1px solid ${({ isClicked }) => (isClicked ? '#04C09E' : 'rgba(0, 0, 0, 0.1)')};
  display: flex;
  gap: 10px;
  background-color: ${({ usable }) => (usable ? '#fff' : 'rgb(243, 245, 247)')};

  cursor: pointer;
`;

const CouponRadio = styled.div<{ isClicked: boolean; usable: boolean }>`
  border: 1px solid rgb(177, 179, 181);
  background-color: ${({ isClicked, usable }) =>
    usable ? (isClicked ? '#04c09e' : '#fff') : 'rgb(243, 245, 247)'};
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CouponRadioInner = styled.div<{ isClicked: boolean; usable: boolean }>`
  ${({ usable }) => !usable && 'display: none'};
  background-color: ${({ isClicked }) => (isClicked ? '#fff' : 'rgb(177, 179, 181)')};
  width: 8px;
  height: 8px;
  border-radius: 8px;
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 223px;
`;
