import { ProductItemType } from 'types/ProductType';
import * as S from './ProductItem.style';
import { CartStepper } from '@views/Cart/components/CartStepper';
import { styled } from 'styled-components';
import { Suspense } from 'react';

interface ProductItemProps {
  product: ProductItemType;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, price, imageUrl } = product;
  return (
    <S.ProductItemBox>
      <S.ProductItemImageBox>
        <S.ProductItemImage src={imageUrl} />
        <S.CartStepperWrapper>
          <CartStepper product={product} />
        </S.CartStepperWrapper>
      </S.ProductItemImageBox>
      <S.ProductDetails>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString('ko-KR')}원</S.ProductPrice>
        </S.ProductInfo>
      </S.ProductDetails>
    </S.ProductItemBox>
  );
}
export default ProductItem;

