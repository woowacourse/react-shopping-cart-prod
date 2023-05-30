import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const OrderCard = ({
  order_id,
  items,
  product_price,
  discount_price,
  delivery_fee,
  total_price,
}) => {
  return (
    <Wrapper>
      <TopSection>
        <div>
          주문 번호 : <span>1</span>
        </div>
        <Link to='/orders/detail/:id'>상세보기</Link>
      </TopSection>
      <BottomSection></BottomSection>
    </Wrapper>
  );
};

export default OrderCard;

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
