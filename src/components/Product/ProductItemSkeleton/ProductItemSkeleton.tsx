import * as S from './ProductItemSkeleton.style.ts';

function ProductItemSkeleton() {
  return (
    <S.ProductItemBox>
      <S.ProductItemImageBox>
        <S.ProductItemImage />
      </S.ProductItemImageBox>
      <S.ProductDetails>
        <S.ProductInfo>
          <S.ProductName />
          <S.ProductPrice />
        </S.ProductInfo>
      </S.ProductDetails>
    </S.ProductItemBox>
  );
}

export default ProductItemSkeleton;
