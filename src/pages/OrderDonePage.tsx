import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import userOrderDetailState from '../recoil/user/userOrderDetailState';
import type { Order } from '../types/Order';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 720px;
  margin: 80px auto 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 36px;
`;

const OrderContainer = styled.div`
  align-self: stretch;
`;

const OrderPrice = styled.div``;

type OrderDoneProps = {
  order: Order;
};

const OrderDone = (props: OrderDoneProps) => {
  const { order } = props;

  return (
    <>
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

      <div>({order.savingRate}%)</div>
    </>
  );
};

const OrderDonePage = () => {
  const params = useParams();
  const orderId = Number(params.orderId);

  return (
    <Content>
      <Title>주문이 완료되었습니다!</Title>

      <OrderContainer>
        <AwaitRecoilState state={userOrderDetailState(orderId)}>
          {(order) => <OrderDone order={order} />}
        </AwaitRecoilState>
      </OrderContainer>
    </Content>
  );
};

export default OrderDonePage;
