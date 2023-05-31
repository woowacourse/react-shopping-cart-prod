import { styled } from 'styled-components';
import Image from '../Common/Image';
import { CartProduct } from '../../types/product';

interface OrderItemProps {
  orderItem: CartProduct;
}

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const { product, quantity } = orderItem;
  const { imageUrl, name, price } = product;

  return (
    <StyledOrderItem>
      <Image src={imageUrl} size="small" />
      <OrderItemFlexBox>
        <h3>{name}</h3>
        <p>
          {price.toLocaleString('ko-KR')}원 / 수량 {quantity}개
        </p>
      </OrderItemFlexBox>
    </StyledOrderItem>
  );
};

const StyledOrderItem = styled.li`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 40px 28px;
`;

const OrderItemFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  letter-spacing: 0.5px;

  & > h3 {
    font-weight: 400;
    line-height: 24px;
  }

  & > p {
    color: #888888;
  }
`;

export default OrderItem;
