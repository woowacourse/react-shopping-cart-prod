import type { CouponType } from '../../types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import PortalDrawer from 'react-portal-drawer';

import CouponList from '../coupon/CouponList';

import {
  cartBillTotalPriceState,
  cartState,
  checkedListState,
  couponsState,
  serverNameState,
  tokenState,
  usableCouponsState,
} from '../../recoil/state';
import { getCoupons, postOrder } from '../../api';
import useToast from '../../hooks/useToast';

interface Props {}

export default function CartBill({}: Props) {
  const token = useRecoilValue(tokenState);
  if (token === null) return <></>;

  const navigate = useNavigate();

  const serverName = useRecoilValue(serverNameState);
  const checkedList = useRecoilValue(checkedListState);
  const cartBillTotalPrice = useRecoilValue(cartBillTotalPriceState);
  const cart = useRecoilValue(cartState);
  const usableCoupons = useRecoilValue(usableCouponsState);
  const setCoupons = useSetRecoilState(couponsState);

  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const { showToast } = useToast();

  const discount = selectedCoupon ? cartBillTotalPrice * (selectedCoupon.discountRate / 100) : 0;
  const deliveryFee = checkedList.filter((checked) => checked).length === 0 ? 0 : 3000;

  const openCouponModal = () => {
    setIsCouponOpen(true);
  };

  const closeCouponModal = () => {
    setIsCouponOpen(false);
  };

  const selectCoupon = (coupon: CouponType) => () => {
    setSelectedCoupon(coupon);
    closeCouponModal();
  };

  const resetCoupon = () => {
    setSelectedCoupon(null);
  };

  const order = async () => {
    const couponId = selectedCoupon === null ? null : selectedCoupon.id;
    const orderItems = cart
      .filter((_, index) => checkedList[index])
      .map(({ product: { id }, quantity }) => ({ productId: id, quantity }));

    try {
      await postOrder(serverName, token, orderItems, couponId);
      navigate('/');
    } catch {
      showToast('error', '주문 실패');
      return;
    }

    try {
      setCoupons(await getCoupons(serverName, token));
    } catch {
      showToast('error', '쿠폰 받아오기 실패');
    }
  };

  return (
    <>
      <Wrapper>
        {usableCoupons.length > 0 && (
          <Box>
            <CouponButton onClick={openCouponModal}>쿠폰선택</CouponButton>
            <CouponLabel>
              {selectedCoupon === null ? (
                '쿠폰을 선택 해주세요'
              ) : (
                <>
                  {selectedCoupon.name} / {selectedCoupon.discountRate}% 할인
                  <ResetButton onClick={resetCoupon}>사용 안하기</ResetButton>
                </>
              )}
            </CouponLabel>
          </Box>
        )}
        <TitleBox>결제예상금액</TitleBox>
        <Box>
          <Row>
            <p>총 상품가격</p>
            <p>{cartBillTotalPrice.toLocaleString()}원</p>
          </Row>
          <CouponRow>
            <p>쿠폰 할인금액</p>
            <p>- {discount.toLocaleString()}원</p>
          </CouponRow>
          <Row>
            <p>총 배송비</p>
            <p>{deliveryFee.toLocaleString()}원</p>
          </Row>
          <Row>
            <p>총 주문금액</p>
            <p>{(cartBillTotalPrice - discount + deliveryFee).toLocaleString()}원</p>
          </Row>
          <OrderButton onClick={order}>주문하기</OrderButton>
        </Box>
      </Wrapper>
      {isCouponOpen && (
        <PortalDrawer selectors="#root" requestClose={closeCouponModal}>
          <CouponList coupons={usableCoupons} selectCoupon={selectCoupon} />
        </PortalDrawer>
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 448px;
  margin-top: 98px;

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

const CouponButton = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: #04c09e;

  font-size: 20px;
  color: white;
`;

const CouponLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 32px;

  font-size: 16px;
`;

const ResetButton = styled.button`
  width: 80px;
  height: 32px;
  border: solid 1px #04c09e;
  border-radius: 4px;
  background: transparent;

  color: #333333;
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

const OrderButton = styled.button`
  width: 100%;
  height: 73px;
  background: #333333;

  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
`;
