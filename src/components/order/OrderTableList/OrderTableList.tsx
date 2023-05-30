import { styled } from 'styled-components';
import type { Order } from '../../../types/order';
import OrderTable from '../OrderTable/OrderTable';

interface OrderTableList {
  orderInfos: Order[];
}


const OrderTableList = ({ orderInfos }: OrderTableList) => {
  return (
    <Container>
      {orderInfos.map((orderInfo) => (
        <OrderTable key={orderInfo.id} orderInfo={orderInfo} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default OrderTableList;
