import { styled } from 'styled-components';
import Image from '../Common/Image';
import { CartProduct } from '../../types/product';

interface OrderItemProps {
  orderItem: CartProduct;
}

export const OrderItem = ({ orderItem }: OrderItemProps) => {
  const { product, quantity } = orderItem;
  const { imageUrl, name, price } = product;

  return (
    <>
      <DesktopOrderItem>
        <Image src={imageUrl} size="small" />
        <OrderItemFlexBox>
          <h3>{name}</h3>
          <div>
            <p>{price.toLocaleString('ko-KR')}원</p>
            <p>{quantity}개</p>
          </div>
        </OrderItemFlexBox>
      </DesktopOrderItem>
      <MobileOrderItem>
        <h3>{name}</h3>
        <Image src={imageUrl} size="small" />
        <div>
          <p>{price.toLocaleString('ko-KR')}원</p>
          <p>{quantity}개</p>
        </div>
      </MobileOrderItem>
    </>
  );
};

const DesktopOrderItem = styled.li`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 40px 28px;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: none;
  }
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

    @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
      flex-direction: column;
    }
  }
`;

const MobileOrderItem = styled.li`
  display: none;

  & > div {
    display: flex;
    gap: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 20px 20px;
  }
`;
