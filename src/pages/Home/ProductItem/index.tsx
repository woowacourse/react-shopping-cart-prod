import QuantityController from '@Components/QuantityController';

import useCartItems from '@Hooks/useCartItems';

import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  width?: string;
};

function ProductItem({ product, width }: ProductItemProps) {
  const { getCartItem } = useCartItems();
  const { name, price, imageUrl, id } = product;
  const cartItem = getCartItem(id);
  const quantity = cartItem ? cartItem.quantity : SHOPPING_QUANTITY.MIN;
  const cartItemId = cartItem ? cartItem.id : undefined;

  const textPrice = `${price.toLocaleString()} 원`;

  return (
    <S.Container aria-label="하나의 판매 품목 정보" width={width}>
      <S.ProductItemImage src={imageUrl} alt={name}></S.ProductItemImage>
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label="판매 품목 이름">{name}</S.ProductItemName>
          <S.ProductItemPrice aria-label="판매 품목 가격">{textPrice}</S.ProductItemPrice>
        </S.ProductItemLayout>
        <S.QuantityControllerWrapper>
          <QuantityController quantity={quantity} cartItemId={cartItemId} product={product} />
        </S.QuantityControllerWrapper>
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
