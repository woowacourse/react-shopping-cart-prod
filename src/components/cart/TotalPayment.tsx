import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useOrder } from '../../hooks/useOrder';
import Modal from '../common/Modal';
import Price from '../common/Price';
import Button from '../common/Button';
import CouponModalContent from '../coupon/CouponModalContent';

interface Props {
  checkedCartItemIds: number[];
  deliveryFee: number;
  totalProductsPrice: number;
}

export default function TotalPayment({
  totalProductsPrice,
  deliveryFee,
  checkedCartItemIds,
}: Props) {
  const navigate = useNavigate();
  const { addOrderItem } = useOrder();
  const [coupon, setCoupon] = useState({ id: -1, discountPrice: 0, minOrderPrice: 9999999999999 });
  const couponModalRef = useRef<HTMLDialogElement>(null);
  const orderPrice = totalProductsPrice + deliveryFee;
  const totalOrderPrice = orderPrice - coupon.discountPrice;

  const openCouponModal = () => couponModalRef.current?.showModal();
  const closeCouponModal = () => couponModalRef.current?.close();

  const handleCouponSelect = ({
    couponId,
    discountPrice,
    minOrderPrice,
  }: Record<string, number>) => {
    setCoupon({ id: couponId, discountPrice: discountPrice, minOrderPrice: minOrderPrice });
    closeCouponModal();
  };

  const handleOrderButtonClick = async () => {
    const orderDetailLocation = await addOrderItem({
      cartItemIds: checkedCartItemIds,
      couponId: coupon.id,
      deliveryFee: deliveryFee,
      totalOrderPrice: totalOrderPrice,
    });

    if (orderDetailLocation) {
      const orderId = orderDetailLocation.split('/').pop();

      navigate(orderDetailLocation, { state: { orderId: orderId } });
    }
  };

  useEffect(() => {
    if (totalProductsPrice < coupon.minOrderPrice) {
      setCoupon({ id: -1, discountPrice: 0, minOrderPrice: 9999999999999 });
    }
  }, [totalProductsPrice, coupon.minOrderPrice]);

  return (
    <Style.TotalPaymentContainer>
      <Style.TitleBox>결제예상금액</Style.TitleBox>
      <Style.PriceAndOrderButtonContainer>
        <Style.PriceContainer>
          <Price price={orderPrice} tag="주문금액" />
          <Price price={totalProductsPrice} tag="ㄴ총 상품금액" color="var(--grey-300)" />
          <Price price={deliveryFee} tag="ㄴ배송비" color="var(--grey-300)" />
          <Style.CouponContainer>
            <Button
              designType="rectangle"
              bgColor={'#04c09e'}
              color="var(--grey-100)"
              fontSize="14px"
              width="80px"
              height="30px"
              onClick={openCouponModal}
            >
              쿠폰조회
            </Button>
            <Price price={coupon.discountPrice} isDiscount={true} />
          </Style.CouponContainer>
          <Style.TotalOrderPriceWrapper>
            <Price price={totalOrderPrice} tag="결제금액" />
          </Style.TotalOrderPriceWrapper>
        </Style.PriceContainer>
        <Button
          designType="rectangle"
          bgColor="var(--grey-500)"
          color="var(--grey-100)"
          fontSize="20px"
          onClick={handleOrderButtonClick}
          disabled={totalProductsPrice === 0}
        >
          주문하기
        </Button>
      </Style.PriceAndOrderButtonContainer>
      {createPortal(
        <Modal ref={couponModalRef} closeModal={closeCouponModal}>
          <ErrorBoundary fallback={<div>쿠폰에서 something wrong</div>}>
            <CouponModalContent
              totalProductsPrice={totalProductsPrice}
              handleCouponSelect={handleCouponSelect}
              closeCouponModal={closeCouponModal}
            />
          </ErrorBoundary>
        </Modal>,
        document.body
      )}
    </Style.TotalPaymentContainer>
  );
}

const Style = {
  TotalPaymentContainer: styled.div`
    width: 300px;
    height: fit-content;
    border: 1px solid var(--grey-300);
  `,

  TitleBox: styled.div`
    padding: 25px;

    font-size: 20px;
  `,

  PriceAndOrderButtonContainer: styled.div`
    border-top: 1px solid var(--grey-300);
    padding: 25px;
  `,

  PriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-bottom: 25px;
  `,

  CouponContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  TotalOrderPriceWrapper: styled.div`
    padding: 7px;
    background-color: #f6f6f6;
  `,
};
