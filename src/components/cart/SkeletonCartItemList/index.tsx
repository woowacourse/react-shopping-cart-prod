import * as S from './SkeletonCartItemList.style';

function SkeletonCart() {
  return (
    <>
      <S.SkeletonWrapper>
        {Array.from({ length: 3 }).map((_, index) => (
          <S.SkeletonImage key={index} />
        ))}
      </S.SkeletonWrapper>
      <S.SkeletonPayingContainer>
        <S.SkeletonPayingBox />
      </S.SkeletonPayingContainer>
    </>
  );
}

export default SkeletonCart;
