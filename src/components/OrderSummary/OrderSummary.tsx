import { useNavigate } from 'react-router-dom';
import * as styled from './OrderSummary.styled';

import { Button } from '@components/common/Button/Button';

import { useTotalProductsPrice } from '@recoils/totalProductsPriceAtoms';
import { useCheckedCartItems } from '@recoils/cartAtoms';
import { useOrdersRepository } from '@recoils/ordersAtoms';
import { useFetchOrderPolicy } from '@recoils/orderPolicyAtoms';

import { usePoint } from '@hooks/usePoint';

interface OrderSummaryProps {
  fetchCartItems: (cartItemId?: number) => Promise<void>;
}

export const OrderSummary = ({ fetchCartItems }: OrderSummaryProps) => {
  const navigate = useNavigate();

  const { fetchOrder } = useOrdersRepository();

  const { freeShippingThreshold, shippingFee, pointPercentage } = useFetchOrderPolicy();

  const checkedCartItems = useCheckedCartItems();

  const totalProductsPrice = useTotalProductsPrice();

  const { usablePoint, pointInputValue, onChangePointInput, onClickUseAllPointButton } = usePoint(
    totalProductsPrice,
    shippingFee
  );

  const totalPaymentPrice = totalProductsPrice + shippingFee - pointInputValue;
  const totalShippingFee = totalProductsPrice >= freeShippingThreshold ? 0 : shippingFee;

  const onClickOrderButton = async () => {
    const response = fetchOrder({
      totalProductsPrice,
      shippingFee: totalShippingFee,
      usedPoint: pointInputValue,
      order: checkedCartItems.map(({ id, quantity }) => ({
        cartItemId: id,
        quantity,
      })),
    });

    response.then(async ({ orderId }) => {
      await fetchCartItems();
      navigate(`/orders/${orderId}`);
    });
  };

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
                <span>+ {totalShippingFee.toLocaleString('ko-kr')} 원</span>
              </styled.ShippingPrice>
              <styled.Point>
                <span>사용할 포인트</span>
                <div>
                  <styled.PointInput
                    onChange={onChangePointInput}
                    value={pointInputValue ? pointInputValue : ''}
                    placeholder={`사용 가능 포인트 ${usablePoint.toLocaleString()}`}
                  />
                  <styled.UseAllPointButton onClick={onClickUseAllPointButton}>
                    전액 사용
                  </styled.UseAllPointButton>
                </div>
              </styled.Point>
              <styled.PaymentPrice>
                <span>예상 주문금액</span>
                <span>{totalPaymentPrice.toLocaleString('ko-kr')}원</span>
                <styled.EarnPoint>
                  +{Math.floor(totalPaymentPrice / pointPercentage).toLocaleString('ko-kr')}원
                  적립예정
                </styled.EarnPoint>
              </styled.PaymentPrice>
            </styled.Prices>
            <Button designType="rectangle" onClick={onClickOrderButton}>
              총 {checkedCartItems.length}건 주문하기({totalPaymentPrice.toLocaleString('ko-kr')}
              원)
            </Button>
          </styled.Content>
        </styled.OrderSummary>
      </>
      <styled.MobileOrderSummary>
        <styled.OrderSummaryM>
          <styled.OrderButtonM onClick={onClickOrderButton}>
            <styled.SelectedProductLength>{checkedCartItems.length}</styled.SelectedProductLength>
            <styled.ButtonRole>주문하기</styled.ButtonRole>
            <styled.TotalPriceM>
              {(totalProductsPrice + shippingFee).toLocaleString('ko-kr')}원
            </styled.TotalPriceM>
          </styled.OrderButtonM>
        </styled.OrderSummaryM>
      </styled.MobileOrderSummary>
    </>
  );
};
