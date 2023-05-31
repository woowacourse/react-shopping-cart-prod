import styled from 'styled-components';
import { Image, ItemContainer, Name, Price } from '../components/common/ProductItem';
import OrderList from '../components/OrderList';

const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 30px 0;

  ${({ theme }) => theme.fonts.title}
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
`;

const OrderListPage = () => {
  return (
    <>
      <Title>주문목록</Title>
      <OrderList />
    </>
  );
};

export default OrderListPage;
