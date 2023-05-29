import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import data from 'mocks/orderList.json';
import OrderItemList from 'components/Order/OrderItemList';

const Order = () => {
  return (
    <ContentLayout>
      <Title>🍋 주문목록 🍋</Title>
      {data.orders.map((order) => (
        <OrderItemList order={order} />
      ))}
    </ContentLayout>
  );
};

export default Order;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;
