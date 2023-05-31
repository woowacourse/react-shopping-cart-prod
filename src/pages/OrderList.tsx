import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import OrderItemList from 'components/Order/OrderItemList';
import { getOrderList } from 'api/requests';
import { useGet } from 'hooks/useGet';
import { Order } from 'types';

const OrderList = () => {
  const { data } = useGet<{ orders: Order[] }>(getOrderList);

  return (
    <ContentLayout>
      <Title>🍋 주문목록 🍋</Title>
      {data?.orders.map((order) => (
        <OrderItemList order={order} />
      ))}
    </ContentLayout>
  );
};

export default OrderList;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;
