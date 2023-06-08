import * as S from './style';

function CouponSkeleton() {
  return (
    <S.Wrapper>
      <S.Container isUsed={false} isLoading={true}>
        <S.CouponLayout>
          <S.CouponDescription></S.CouponDescription>
          <S.CouponName></S.CouponName>
          <S.CouponSubMessage></S.CouponSubMessage>
        </S.CouponLayout>
        <S.CouponButton isLoading={true}></S.CouponButton>
      </S.Container>
    </S.Wrapper>
  );
}

export default CouponSkeleton;
