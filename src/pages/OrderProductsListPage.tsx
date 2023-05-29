import styled from 'styled-components';
import OrderProductList from '../components/Order/OrderProductList';
import orderProducts from '../mocks/data/orderProduct.json';
import Title from '../components/Common/Title';

const OrderProductsListPage = () => {
  return (
    <Main>
      <Title>주문 목록</Title>
      {orderProducts.map((order) => (
        <OrderProductList
          orderProducts={order}
          key={order.orderId}
          showDetailsLink
        />
      ))}
    </Main>
  );
};

const Main = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 100px 0;
`;

export default OrderProductsListPage;
