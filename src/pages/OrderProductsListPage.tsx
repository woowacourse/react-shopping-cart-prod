import styled from 'styled-components';
import OrderProductList from '../components/Order/OrderProductList';
import orderProducts from '../mocks/data/orderProduct.json';

const OrderProductsListPage = () => {
  return (
    <Main>
      <OrderProductsTitle>주문 목록</OrderProductsTitle>
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

const OrderProductsTitle = styled.h1`
  width: 100%;
  height: 130px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

export default OrderProductsListPage;
