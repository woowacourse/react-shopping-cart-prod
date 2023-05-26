import * as S from './ProductItem.styles';

const ProductItemSkeleton = () => {
  return (
    <S.ProductItemContainer>
      <S.ItemImageContainer className="skeleton" />
      <S.ItemName className="skeleton" />
      <S.ItemPriceContainer className="skeleton" />
    </S.ProductItemContainer>
  );
};

export default ProductItemSkeleton;
