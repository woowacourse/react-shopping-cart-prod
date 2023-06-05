import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import FullWidthTitle from '../../common/FullWidthTitle/FullWidthTitle';
import OrderTableList from '../../order/OrderTableList/OrderTableList';

const OrderPage = () => {
  return (
    <>
      <FullWidthTitle>주문 내역</FullWidthTitle>
      <Spacer height={28} />
      <OrderListContainer>
        <OrderTableList />
      </OrderListContainer>
    </>
  );
};

export default OrderPage;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
