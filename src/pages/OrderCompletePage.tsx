import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentOrderSelector, orderState } from '../store/OrderState';
import { OrderListWrapper } from '../style/ContentLayout';
import useGet from '../hooks/useGet';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { OrderItem } from '../types';
import { LoadingSpinner } from '../components/@common/LoadingSpinner';
import OrderCompleteItem from '../components/order/OrderCompleteItem';
import { S } from '../components/order/OrderCompleteItem/OrderCompleteItem.styles';

const OrderCompletePage = () => {
  const serverUrl = useRecoilValue(serverState);
  const setOrder = useSetRecoilState(orderState);
  const { data, isLoading } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  useEffect(() => {
    if (data) setOrder(data);
  }, [data, setOrder]);

  const currentOrder = useRecoilValue(currentOrderSelector);

  const order = currentOrder ? (
    currentOrder.orderProducts.map(({ id, price, quantity, imageUrl, name }) => {
      return (
        <S.ItemWrapper key={id}>
          <S.Image src={imageUrl} alt={name} />
          <S.InfoWrapper>
            <span>{name}</span>
            <span>{`${quantity}개 ${price * quantity}원`}</span>
          </S.InfoWrapper>
        </S.ItemWrapper>
      );
    })
  ) : (
    <LoadingSpinner />
  );

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <OrderListWrapper>
      <OrderCompleteItem order={order} id={currentOrder.orderId} />
    </OrderListWrapper>
  );
};

export default OrderCompletePage;
