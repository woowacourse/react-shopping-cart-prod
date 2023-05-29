import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import OrderProductList from '../components/Order/OrderProductList';
import PaymentInfoBox from '../components/Order/PaymentInfoBox';
import Title from '../components/Common/Title';
import orderProducts from '../mocks/data/orderProduct.json';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const filteredOrders = orderProducts.filter(
    (order) => order.orderId === Number(orderId)
  );

  return (
    <Main>
      <Title>주문 내역 상세</Title>
      {filteredOrders.map((orderProduct) => (
        <>
          <OrderProductList
            orderProducts={orderProduct}
            key={orderProduct.orderId}
          />
          <PaymentInfoBox totalPrice={orderProduct.totalPrice} />
        </>
      ))}
    </Main>
  );
};

const Main = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 100px 0;
`;

export default OrderDetailsPage;
