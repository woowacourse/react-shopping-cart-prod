import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import type { Order } from '../types/Order';
import PriceFormat from './common/PriceFormat';

const OrderListItemContainer = styled.div`
  border: 1px solid #aaaaaa;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 36px;
  background: #f6f6f6;
  border-bottom: 1px solid #aaaaaa;
`;

const OrderReceipt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  padding: 24px;
  background: #f6f6f6;
  border-top: 1px solid #aaaaaa;
`;

const OrderHeaderContent = styled.div``;

const OrderCartItemList = styled.div`
  & > * {
    height: 220px;
  }

  & > * + * {
    border-top: 1px solid #aaaaaa;
  }
`;

const TotalPrice = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const Points = styled.h3`
  font-size: 16px;
`;

type OrderListItemProps = PropsWithChildren<{
  order: Order;
}>;

const OrderListItem = (props: OrderListItemProps) => {
  const { order, children } = props;

  const totalPrice = order.cartItems.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
    0,
  );
  const savingPoints = (totalPrice * order.savingRate) / 100;

  return (
    <OrderListItemContainer>
      <OrderHeader>
        <OrderHeaderContent>주문번호: {order.id}</OrderHeaderContent>
        <OrderHeaderContent>
          <Link to={`/orders/${order.id}`}>상세보기 ›</Link>
        </OrderHeaderContent>
      </OrderHeader>

      <OrderCartItemList>{children}</OrderCartItemList>

      <OrderReceipt>
        <TotalPrice>
          <PriceFormat price={totalPrice} />
        </TotalPrice>
        <Points>
          사용 포인트: <PriceFormat price={order.usedPoints} unit="P" /> / 적립 포인트:{' '}
          <PriceFormat price={savingPoints} unit="P" />
        </Points>
      </OrderReceipt>
    </OrderListItemContainer>
  );
};

export default OrderListItem;
