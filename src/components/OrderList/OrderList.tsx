import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const OrderList = () => {
  return (
    <Wrapper>
      <TopSection>
        <div>
          주문 번호 : <span>1</span>
        </div>
        <Link to='/orders/detail/:id'>상세보기</Link>
      </TopSection>
      <BottomSection>
        <OrderItem></OrderItem>
        <OrderItem></OrderItem>
      </BottomSection>
    </Wrapper>
  );
};

export default OrderList;

const Wrapper = styled.ul``;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;

  width: 100%;
  height: 92px;

  background-color: #f6f6f6;

  border: 1px solid #aaaaaa;
`;

const BottomSection = styled.div``;

const OrderItem = styled.li`
  width: 100%;
  height: 220px;

  border: 1px solid black;
`;
