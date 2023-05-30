import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Order } from '../../types/responseData';
import OrderItem from '../OrderItem/OrderItem';

const OrderCard = ({
  orderId,
  items,
  productPrice,
  discountPrice,
  deliveryFee,
  totalPrice,
}: Order) => {
  return (
    <Wrapper>
      <TopSection>
        <div>
          주문 번호 : <span>{orderId}</span>
        </div>
        <Link to='/orders/detail/:id'>상세보기</Link>
      </TopSection>
      <BottomSection>
        {items.map((item) => {
          const { quantity, product } = item;
          const { id: productId, name, price, imageUrl } = product;

          return (
            <OrderItem
              key={`${orderId}/${productId}`}
              quantity={quantity}
              name={name}
              price={price}
              imageUrl={imageUrl}
            />
          );
        })}
      </BottomSection>
    </Wrapper>
  );
};

export default OrderCard;

const Wrapper = styled.ul`
  width: 100%;
`;

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
