import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styled from './OrderSummary.styled';

import { Button } from '@components/common/Button/Button';

import { useTotalProductsPrice } from '@recoils/totalProductsPriceAtoms';
import { useCheckedCartItems } from '@recoils/cartAtoms';

import { isNumeric } from '@utils/index';

import { DELIVERY_CHARGE } from '@constants/index';
import { useOrdersRepository } from '@recoils/ordersAtoms';
import { useFetchUsablePoint } from '@recoils/usablePointAtoms';

const shippingFee = DELIVERY_CHARGE;

export const OrderSummary = () => {
  const navigate = useNavigate();

  const { fetchOrder } = useOrdersRepository();
  const useablePoint = useFetchUsablePoint();

  const checkedCartItems = useCheckedCartItems();
  const [pointInputValue, setPointInputValue] = useState(0);

  const totalProductsPrice = useTotalProductsPrice();

  const onClickUseAppPointButton = () => {};

  const onChangePointInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(value)) return;

    setPointInputValue(Number(value));
  };

  const onClickOrderButton = () => {
    const response = fetchOrder({
      totalProductsPrice,
      shippingFee: 3000,
      usedPoint: pointInputValue,
      order: checkedCartItems.map(({ id, quantity }) => ({
        cartItemId: id,
        quantity,
      })),
    });

    response.then(({ orderId }) => navigate(`/orders/${orderId}`));
  };

  const totalPaymentPrice = totalProductsPrice + shippingFee - pointInputValue;

  return (
    <>
      <>
        <styled.OrderSummary>
          <styled.OrderSummaryHeader>결제예상금액</styled.OrderSummaryHeader>
          <styled.Content>
            <styled.Prices>
              <styled.TotalProductsPrice>
                <span>총 선택상품금액</span>
                <span>{totalProductsPrice.toLocaleString('ko-kr')}원</span>
              </styled.TotalProductsPrice>
              <styled.ShippingPrice>
                <span>배송비</span>
                <span>+ {shippingFee.toLocaleString('ko-kr')}원</span>
              </styled.ShippingPrice>
              <styled.Point>
                <span>사용할 포인트</span>
                <div>
                  <styled.PointInput
                    onChange={onChangePointInput}
                    value={pointInputValue ? pointInputValue : ''}
                    placeholder={`사용 가능 포인트 ${useablePoint.toLocaleString()}`}
                  />
                  <styled.UseAllPointButton onClick={onClickUseAppPointButton}>
                    전액 사용
                  </styled.UseAllPointButton>
                </div>
              </styled.Point>
              <styled.PaymentPrice>
                <span>예상 주문금액</span>
                <span>{totalPaymentPrice.toLocaleString('ko-kr')}원</span>
                <styled.EarnPoint>
                  +{Math.floor(totalPaymentPrice / 10).toLocaleString('ko-kr')}원 적립예정
                </styled.EarnPoint>
              </styled.PaymentPrice>
            </styled.Prices>
            <Button designType="rectangle" onClick={onClickOrderButton}>
              총 {checkedCartItems.length}건 주문하기(${totalPaymentPrice.toLocaleString('ko-kr')}
              원)
            </Button>
          </styled.Content>
        </styled.OrderSummary>
      </>
      <>
        <styled.OrderSummaryM>
          <styled.OrderButtonM>
            <styled.SelectedProductLength>{checkedCartItems.length}</styled.SelectedProductLength>
            <styled.ButtonRole>주문하기</styled.ButtonRole>
            <styled.TotalPriceM>
              {(totalProductsPrice + shippingFee).toLocaleString('ko-kr')}원
            </styled.TotalPriceM>
          </styled.OrderButtonM>
        </styled.OrderSummaryM>
      </>
    </>
  );
};
