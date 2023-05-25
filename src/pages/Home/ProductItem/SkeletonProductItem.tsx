import * as S from './style';

function SkeletonProductItem() {
  return (
    <S.Container>
      <S.ProductItemImage></S.ProductItemImage>
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName isLoading>로딩중</S.ProductItemName>
          <S.ProductItemPrice isLoading>로딩중</S.ProductItemPrice>
        </S.ProductItemLayout>
      </S.ProductItemContents>
    </S.Container>
  );
}

export default SkeletonProductItem;
