import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import OrderCartItem from '../components/OrderCartItem';
import OrderListItem from '../components/OrderListItem';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
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

type OrderDoneProps = {
  order: Order;
};

const OrderDone = (props: OrderDoneProps) => {
  const { order } = props;

  return (
    <OrderListItem order={order}>
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

const OrderDonePage = () => {
  const params = useParams();
  const orderId = Number(params.orderId);

  return (
    <Content>
      <AwaitRecoilState
        state={userOrderDetailState(orderId)}
        loadingElement={<LoadingPlaceholder title="주문 정보를 불러오고 있습니다 ..." />}
      >
        {(order) => (
          <>
            <Title>주문이 완료되었습니다!</Title>

            <OrderContainer>
              <OrderDone order={order} />
            </OrderContainer>
          </>
        )}
      </AwaitRecoilState>
    </Content>
  );
};

export default OrderDonePage;
