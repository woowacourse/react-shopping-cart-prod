import * as Styled from './ProductItemSkeleton.styles.tsx';

const ProductItemSkeleton = () => (
  <Styled.SkeletonItemWrapper>
    <Styled.SkeletonImageOverflowContainer />
    <Styled.SkeletonItemInfo>
      <Styled.SkeletonItemInfoUpperBoundary>
        <Styled.SkeletonItemTitle />
        <Styled.SkeletonItemPrice />
      </Styled.SkeletonItemInfoUpperBoundary>
      <Styled.SkeletonButton />
    </Styled.SkeletonItemInfo>
  </Styled.SkeletonItemWrapper>
);

export default ProductItemSkeleton;
