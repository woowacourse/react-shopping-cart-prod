/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentOrderSelector, orderState } from '../store/OrderState';
import { OrderListWrapper } from '../style/ContentLayout';
import useGet from '../hooks/useGet';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { OrderItem } from '../types';
import { LoadingSpinner } from '../components/@common/LoadingSpinner/LoadingSpinner';
import OrderCompleteItem from '../components/order/OrderCompleteItem';
import { S } from '../components/order/OrderCompleteItem/OrderCompleteItem.styles';
import useNavigatePage from '../hooks/useNavigatePage';

const OrderCompletePage = () => {
  const serverUrl = useRecoilValue(serverState);
  const setOrder = useSetRecoilState(orderState);
  const { data: orderData, isLoading } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);
  const { goHome, goOrderDetail } = useNavigatePage();

  useEffect(() => {
    if (orderData) setOrder(orderData);
  }, [orderData]);

  const currentOrder = useRecoilValue(currentOrderSelector);
  const id = currentOrder ? currentOrder.orderId : null;

  if (isLoading) return <LoadingSpinner />;

  if (currentOrder && id)
    return (
      <OrderListWrapper>
        <OrderCompleteItem order={currentOrder} id={id} />
        <S.ButtonWrapper>
          <S.HomeButton onClick={goHome}>홈으로 가기</S.HomeButton>
          <S.DetailButton onClick={() => goOrderDetail(id)}>주문 상세 내역 보기</S.DetailButton>
        </S.ButtonWrapper>
      </OrderListWrapper>
    );

  return null;
};

export default OrderCompletePage;
