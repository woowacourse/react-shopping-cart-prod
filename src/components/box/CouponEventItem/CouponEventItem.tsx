import styled from '@emotion/styled';
import { IssuableCouponType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import useCoupon from '../../../hooks/useCoupon';

const CouponEventItem = ({ coupon }: { coupon: IssuableCouponType }) => {
  const { issueCouponAPI } = useCoupon('issuable');

  const issueCoupon = () => {
    if (coupon.issuable) {
      issueCouponAPI.mutate(coupon.id);
    }
  };

  return (
    <CouponEventItemWrapper onClick={issueCoupon} issuable={coupon.issuable}>
      <CouponEventItemInner>
        <CouponEventTextArea>
          <CouponEventLabel>
            <Text color="#fff" size="smaller" weight="bold">
              즉시발급
            </Text>
          </CouponEventLabel>
          <CouponName>
            <Text color="#fff" size="largest" weight="extraBold">
              {coupon.name}
            </Text>
          </CouponName>
          <Text color="#fff" size="medium" weight="normal">
            {`${coupon.minimumPrice.toLocaleString()}원 이상 구매시 적용`}
          </Text>
        </CouponEventTextArea>
        <CouponIssueButton issuable={coupon.issuable}>
          <Text color={coupon.issuable ? '#04C09E' : '#fff'} size="medium" weight="bold">
            {coupon.issuable ? '쿠폰 발급받기' : '발급완료'}
          </Text>
        </CouponIssueButton>
      </CouponEventItemInner>
    </CouponEventItemWrapper>
  );
};

export default CouponEventItem;

const CouponEventItemWrapper = styled.div<{ issuable: boolean }>`
  width: 100%;
  height: 210px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(271.45deg, #00a3ff 0%, #25788b 34.9%, #318a7a 65.62%, #04c09e 84.9%);
  cursor: ${({ issuable }) => (issuable ? ' pointer' : 'not-allowed')};
`;

const CouponName = styled.div`
  & > p {
    max-width: 500px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media screen and (max-width: 1320px) {
      max-width: 370px;
    }

    @media screen and (max-width: 1000px) {
      max-width: 200px;
    }
  }
`;

const CouponEventItemInner = styled.div`
  display: flex;
  width: 63%;
  justify-content: space-between;
  align-items: center;
`;

const CouponEventTextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const CouponEventLabel = styled.div`
  width: 100px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CouponIssueButton = styled.button<{ issuable: boolean }>`
  width: 200px;
  height: 50px;
  background: ${({ issuable }) => (issuable ? '#fff' : 'rgba(0, 0, 0, 0.5)')};
  border-radius: 10px;
  cursor: ${({ issuable }) => (issuable ? ' pointer' : 'not-allowed')};
`;
