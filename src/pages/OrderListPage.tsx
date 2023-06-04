import { styled } from 'styled-components';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import PageHeader from '../components/page/PageHeader';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import userOrdersState from '../recoil/user/userOrdersState';
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

      <AwaitRecoilState
        state={userOrdersState}
        loadingElement={<LoadingPlaceholder title="주문 목록을 불러오는 중입니다 ..." />}
      >
        {(orders) => (
          <OrderList>
            {[...orders]
              .sort((orderA, orderB) => orderB.id - orderA.id)
              .map((order) => (
                <OrderListItemRenderer key={order.id} order={order} />
              ))}
          </OrderList>
        )}
      </AwaitRecoilState>
    </>
  );
};

export default OrderListPage;
