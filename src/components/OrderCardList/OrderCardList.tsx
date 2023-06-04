import { getOrderList } from 'apis/orders';
import Box from 'components/@common/Box';
import useFetch from 'hooks/useFetch';
import { Order } from 'types/order';
import OrderCard from './OrderCard/OrderCard';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
import EmptyDataCard from 'components/EmptyDataCard/EmptyDataCard';

const OrderCardList = () => {
  const { data: orderList, isLoading, errorState, fetchData } = useFetch<Order[]>(getOrderList);

  if (isLoading) return <div>주문목록 로딩중</div>;
  if (errorState?.isError) {
    return <LoadingErrorCard onClickRetryButton={fetchData}>{errorState.error.message}</LoadingErrorCard>;
  }

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column', gap: '60px' }} role="list">
      {orderList && orderList.map((order) => <OrderCard key={order.orderId} order={order} />)}
      {orderList?.length === 0 && <EmptyDataCard>주문 목록이 비어있어요</EmptyDataCard>}
    </Box>
  );
};

export default OrderCardList;
