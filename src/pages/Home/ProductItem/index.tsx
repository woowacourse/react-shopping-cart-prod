import { useRecoilValue } from 'recoil';

import QuantityController from '@Components/QuantityController';

import cartItemState from '@Selector/cartItemState';

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
  const { name, price, imageUrl } = product;
  const { quantity, cartItemId } = useRecoilValue(cartItemState(product.id));

  const textPrice = `${price.toLocaleString()} 원`;

  return (
    <S.Container aria-label="하나의 판매 품목 정보" width={width}>
      <S.ProductItemImage src={imageUrl} alt={name}></S.ProductItemImage>
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label="판매 품목 이름">{name}</S.ProductItemName>
          <S.ProductItemPrice aria-label="판매 품목 가격">{textPrice}</S.ProductItemPrice>
        </S.ProductItemLayout>
        <QuantityController quantity={quantity} cartItemId={cartItemId} product={product} />
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
