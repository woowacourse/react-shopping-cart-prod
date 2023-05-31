import styled from 'styled-components';

import OrderItem from './OrderItem';
import TotalPriceBox from './TotalPriceBox';

import useOrderDetail from '../../hooks/useOrderDetail';

const OrderDetail = () => {
  const { order, totalPrice } = useOrderDetail();

  return (
    <OrderDetailContainer>
      <OrderItem order={order} />
      <TotalPriceContainer>
        <TotalPriceBox totalPrice={totalPrice} />
      </TotalPriceContainer>
    </OrderDetailContainer>
  );
};

const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalPriceContainer = styled.section`
  align-self: flex-end;
  width: 100%;
  max-width: 560px;
  margin: 28px 0 0 0;
`;

export default OrderDetail;
