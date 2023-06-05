import type { CartItemType } from '../../types/product';

import styled from 'styled-components';

import Image from '../Common/Image';

interface OrderItemProps {
  orderProduct: CartItemType;
}

const OrderItem = ({ orderProduct }: OrderItemProps) => {
  const { quantity, product } = orderProduct;
  const { name, price, imageUrl } = product;

  return (
    <Main>
      <Image src={imageUrl} loading='lazy' size='small' />
      <ProductInfo>
        <Name>{name}</Name>
        <Price>
          {price.toLocaleString('ko-KR')} 원 / 수량 : {quantity}개
        </Price>
      </ProductInfo>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  height: 220px;

  display: flex;
  justify-content: start;
  gap: 30px;

  background: #ffffff;
  border-top: 1px solid #aaaaaa;

  padding: 38px 26px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 40px;
`;

const Name = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  /* or 120% */

  letter-spacing: 0.5px;
`;

const Price = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  letter-spacing: 0.5px;

  color: #888888;
`;
export default OrderItem;
