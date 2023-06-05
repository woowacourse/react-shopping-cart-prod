import { styled } from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import { ordersQuery } from '../../../recoil/selectors';
import OrderTable from '../OrderTable/OrderTable';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/Error/ErrorComponent';

const OrderTableList = () => {
  const orderInfos = useRecoilValueLoadable(ordersQuery);

  if (orderInfos.state === 'loading') {
    return <Spinner />;
  }

  if (orderInfos.state === 'hasError') {
    return <ErrorComponent>{orderInfos.contents.message}</ErrorComponent>;
  }

  return (
    <Container>
      {orderInfos.contents.map((orderInfo) => (
        <OrderTable key={orderInfo.id} orderInfo={orderInfo} />
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
