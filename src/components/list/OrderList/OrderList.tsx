import styled from '@emotion/styled';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import useOrder from '../../../hooks/useOrder';
import OrderItem from '../../box/Order/OrderItem';
import EmptyList from '../../common/EmptyList';

const OrderList = () => {
  const { orderData, isFetching, isError } = useOrder();

  if (isFetching) {
    return <LoadingSpinner />;
  }
  if (isError || !orderData) {
    return <ErrorBox errorType="network" />;
  }
  if (orderData.length === 0) {
    return <EmptyList text="주문내역이 없습니다" />;
  }
  return (
    <OrderListWrapper>
      {orderData.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </OrderListWrapper>
  );
};

export default OrderList;

const OrderListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  & > div:not(:last-child) {
    margin-bottom: 30px;
  }
`;
