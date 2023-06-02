import type { OrderDetailType } from '../../types';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { tokenState } from '../../recoil/state';

interface Props
  extends Pick<
    OrderDetailType,
    'coupon' | 'totalPrice' | 'couponDiscountPrice' | 'deliveryPrice'
  > {}

export default function OrderBill(props: Props) {
  const { coupon, totalPrice, couponDiscountPrice, deliveryPrice } = props;

  const token = useRecoilValue(tokenState);
  if (token === null) return <>로그인 해줘</>;

  return (
    <Wrapper>
      {coupon ? (
        <Box>
          <CouponLabel>
            <span>사용한 쿠폰 : </span>
            {coupon.name} / {coupon.discountRate}% 할인
          </CouponLabel>
        </Box>
      ) : null}
      <TitleBox>결제금액</TitleBox>
      <Box>
        <Row>
          <p>총 상품가격</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </Row>
        <CouponRow>
          <p>쿠폰 할인금액</p>
          <p>- {couponDiscountPrice.toLocaleString()}원</p>
        </CouponRow>
        <Row>
          <p>총 배송비</p>
          <p>{deliveryPrice.toLocaleString()}원</p>
        </Row>
        <Row>
          <p>총 주문금액</p>
          <p>{(totalPrice - couponDiscountPrice + deliveryPrice).toLocaleString()}원</p>
        </Row>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 448px;

  @media (max-width: 448px) {
    width: 100%;
    margin-top: 64px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 92px;
  border: 1px solid #dddddd;
  padding: 0 28px;

  font-size: 24px;
  font-weight: 400;
  color: #333333;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 32px;
  border: 1px solid #dddddd;
  padding: 38px 30px;
`;

const CouponLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 32px;

  font-size: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  padding-left: 6px;

  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #333333;

  &:last-of-type {
    margin-top: 16px;
    margin-bottom: 48px;
  }
`;

const CouponRow = styled(Row)`
  color: #04c09e;
`;
