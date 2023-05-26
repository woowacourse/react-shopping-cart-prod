/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './SkeletonProduct.style';

function SkeletonProduct() {
  return (
    <S.SkeletonRow>
      {Array.from({ length: 12 }).map((_, index) => (
        <S.SkeletonColumn key={index}>
          <S.SkeletonProductItem>
            <S.StyleSkeletonImg />
            <div>
              <S.SkeletonProductName></S.SkeletonProductName>
              <S.SkeletonProductPrice></S.SkeletonProductPrice>
            </div>
          </S.SkeletonProductItem>
        </S.SkeletonColumn>
      ))}
    </S.SkeletonRow>
  );
}

export default SkeletonProduct;
