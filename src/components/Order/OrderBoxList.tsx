import { styled } from 'styled-components';
import OrderBoxItem from './OrderBoxItem';

const OrderBoxList = () => {
  return (
    <StyledOrderBoxList>
      <OrderBoxItem type="orderList">
        <h2>INFO</h2>
      </OrderBoxItem>
      <OrderBoxItem type="payment">
        <>
          <h2>총 결제금액</h2>
          <p>325,000원</p>
        </>
      </OrderBoxItem>
    </StyledOrderBoxList>
  );
};

const StyledOrderBoxList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: calc(100% - 120px);
  padding: 20px 0;
`;

export default OrderBoxList;
