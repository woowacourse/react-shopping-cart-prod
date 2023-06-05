import { styled } from 'styled-components';
import OrderTable from '../OrderTable/OrderTable';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/Error/ErrorComponent';
import useOrders from '../../../hooks/useOrders';

const OrderTableList = () => {
  const { orders } = useOrders();

  if (orders.state === 'loading') {
    return <Spinner />;
  }

  if (orders.state === 'hasError') {
    return <ErrorComponent>{orders.contents.message}</ErrorComponent>;
  }

  return (
    <Container>
      {orders.contents.map((orderInfo) => (
        <OrderTable
          key={orderInfo.id}
          orderInfo={orderInfo}
          showDetailButton={true}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

export default OrderTableList;
