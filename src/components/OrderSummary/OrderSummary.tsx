import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styled from './OrderSummary.styled';

import { Button } from '@components/common/Button/Button';
import { Spinner } from '@components/common/Spinner/Spinner';

import { useTotalProductsPrice } from '@recoils/recoilTotalPrice';
import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';
import { useCheckedCartItems } from '@recoils/recoilCart';

import { useQuery } from '@hooks/useQuery';
import { useMutation } from '@hooks/useMutation';

import { isNumeric } from '@utils/index';

import { DELIVERY_CHARGE, FETCH_METHOD, FETCH_URL } from '@constants/index';

interface PointResponseData {
  usablePoint: number;
}

const shippingFee = DELIVERY_CHARGE;

export const OrderSummary = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: pointData, loading } = useQuery<PointResponseData>(`${baseUrl}/point`, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });
  const {
    mutation: orderMutation,
    data: orderResponseData,
    loading: orderLoading,
  } = useMutation(FETCH_METHOD.POST);

  const [pointInputValue, setPointInputValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!orderResponseData) return;

    const { orderId } = orderResponseData;

    navigate(`/orders/${orderId}`);
  }, [orderResponseData]);

  const checkedCartItems = useCheckedCartItems();

  const totalProductsPrice = useTotalProductsPrice();

  const onClickUseAppPointButton = () => {
    if (!pointData) return;

    setPointInputValue(pointData?.usablePoint);
  };

  const onChangePointInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!pointData || !isNumeric(value)) return;

    const point = Number(value);

    setPointInputValue(() => {
      if (point > pointData?.usablePoint) {
        return pointData?.usablePoint;
      }

      return point;
    });
  };

  const onClickOrderButton = () => {
    if (orderLoading) return;

    orderMutation(FETCH_URL.ORDERS, {
      totalProductsPrice,
      shippingFee,
      usedPoint: pointInputValue,
      order: checkedCartItems.map(({ id, quantity }) => ({
        cartItemId: id,
        quantity,
      })),
    });
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
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <styled.PointInput
                      onChange={onChangePointInput}
                      value={pointInputValue ? pointInputValue : ''}
                      placeholder={`사용 가능 포인트 ${pointData?.usablePoint?.toLocaleString(
                        'ok-kr'
                      )}`}
                    />
                  )}
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
            <Button designType="rectangle" onClick={onClickOrderButton} disabled={orderLoading}>
              {orderLoading ? (
                <Spinner size="sm" />
              ) : (
                `총 ${checkedCartItems.length}건 주문하기(${totalPaymentPrice.toLocaleString(
                  'ko-kr'
                )}원)`
              )}
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
