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
        <div>
          <p>{price.toLocaleString('ko-KR')}원</p>
          <p>{quantity}개</p>
        </div>
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
  height: 100%;

  letter-spacing: 0.5px;

  & > h3 {
    margin-right: 20px;

    font-weight: 400;
    line-height: 24px;
  }

  & > div {
    display: flex;
    margin-top: 20px;

    & > p {
      margin-right: 8px;
      color: #888888;
    }

    @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
      flex-direction: column;
    }
  }
`;

export default OrderItem;
