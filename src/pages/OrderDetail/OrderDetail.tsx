import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import { withLogin } from '@/components/helper/withLogin';
import OrderItem from '@/components/order/OrderItem/OrderItem';
import * as Styled from './OrderDetail.style';

const order = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      productId: 6,
      name: '음식1',
      price: 1000,
      quantity: 2,
      imageURL: 'http:...',
    },
    {
      id: 2,
      productId: 7,
      name: '음식2',
      price: 1000,
      quantity: 3,
      imageURL: 'http:...',
    },
  ],
};
function OrderDetail() {
  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문 상세</Styled.Title>
        <Styled.Wrapper>
          <OrderItem key={order.id} order={order} />
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderDetail, true);
