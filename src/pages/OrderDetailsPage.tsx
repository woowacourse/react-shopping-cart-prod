import styled from 'styled-components';
import OrderProductList from '../components/Order/OrderProductList';
import orderProducts from '../mocks/data/orderProduct.json';
import { useParams } from 'react-router-dom';
import PaymentInfoBox from '../components/Order/PaymentInfoBox';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const filteredOrders = orderProducts.filter(
    (order) => order.orderId === Number(orderId)
  );

  return (
    <Main>
      <OrderDetailsTitle>주문 내역 상세</OrderDetailsTitle>
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

const OrderDetailsTitle = styled.h1`
  width: 100%;
  height: 130px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

export default OrderDetailsPage;
