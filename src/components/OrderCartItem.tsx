import { styled } from 'styled-components';
import type { OrderCartItem as OrderCartItemType } from '../types/OrderCartItem';

const OrderCartItemContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 40px 26px;
  height: 100%;
`;

const OrderDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductImage = styled.img`
  object-fit: cover;
`;

const ProductName = styled.h2`
  font-size: 20px;
  color: #333333;
`;

const OrderPriceAndQuantity = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #888888;
`;

type OrderCartItemProps = {
  productName: OrderCartItemType['name'];
  productPrice: OrderCartItemType['price'];
  quantity: OrderCartItemType['quantity'];
  imageUrl: OrderCartItemType['imageUrl'];
};

const OrderCartItem = (props: OrderCartItemProps) => {
  const { productName, productPrice, quantity, imageUrl } = props;

  return (
    <OrderCartItemContainer>
      <ProductImage src={imageUrl} />
      <OrderDescription>
        <ProductName>{productName}</ProductName>
        <OrderPriceAndQuantity>
          {productPrice}원 / 수량 : {quantity}개
        </OrderPriceAndQuantity>
      </OrderDescription>
    </OrderCartItemContainer>
  );
};

export default OrderCartItem;
