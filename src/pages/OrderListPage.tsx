import { getOrders } from 'apis/orders';
import FlexBox from 'components/@common/FlexBox';
import Spinner from 'components/@common/Loader';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
import OrderItem from 'components/OrderItem/OrderItem';
import useFetch from 'hooks/useFetch';
import styled from 'styled-components';
import { Order } from 'types/order';

const OrderListPage = () => {
  const { data, isLoading, errorState, fetchData } = useFetch<Order[]>(getOrders);
  const orders = data ?? [];

  if (errorState?.isError) return <LoadingErrorCard onClickRetryButton={fetchData} />;
  if (isLoading) return <Spinner />;

  return (
    <OrderListPageContainer flexDirection="column">
      <PageTitle>주문 목록</PageTitle>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} type="list" />
      ))}
    </OrderListPageContainer>
  );
};

export default OrderListPage;

const OrderListPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`;
