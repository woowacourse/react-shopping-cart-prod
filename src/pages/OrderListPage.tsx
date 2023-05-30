import { styled } from 'styled-components';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import PageHeader from '../components/PageHeader';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import ordersQuery from '../recoil/queries/ordersQuery';
import type { Order } from '../types/Order';

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

type OrderListItemRendererProps = {
  order: Order;
};

const OrderListItemRenderer = (props: OrderListItemRendererProps) => {
  const { order } = props;

  return (
    <OrderListItem orderId={order.id}>
      {order.cartItems.map((orderCartItem) => (
        <OrderCartItem
          key={orderCartItem.productId}
          productName={orderCartItem.name}
          productPrice={orderCartItem.price}
          quantity={orderCartItem.quantity}
          imageUrl={orderCartItem.imageUrl}
        />
      ))}
    </OrderListItem>
  );
};

const OrderListPage = () => {
  return (
    <>
      <PageHeader>주문 목록</PageHeader>

      <AwaitRecoilState state={ordersQuery}>
        {(orders) => (
          <OrderList>
            {orders.map((order) => (
              <OrderListItemRenderer key={order.id} order={order} />
            ))}
          </OrderList>
        )}
      </AwaitRecoilState>
    </>
  );
};

export default OrderListPage;
