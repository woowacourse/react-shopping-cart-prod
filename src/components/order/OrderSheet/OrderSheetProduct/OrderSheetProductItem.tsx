import styled from 'styled-components';
import { CartProduct } from '../../../../types/product';
import { formatPrice } from '../../../../utils/formatPrice';

const OrderSheetProductItem = (cartProduct: CartProduct) => {
  const { quantity } = cartProduct;
  const { name, price } = cartProduct.product;

  const totalPrice = formatPrice(price * quantity);

  return (
    <ItemContainer>
      <ItemName>{name}</ItemName>
      <ItemQuantity>{quantity}개</ItemQuantity>
      <ItemPrice>{totalPrice}</ItemPrice>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

const ItemQuantity = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: rgb(130, 140, 148);
`;

const ItemPrice = styled.p`
  font-size: 16px;
  color: rgb(47, 52, 56);
`;

export default OrderSheetProductItem;
