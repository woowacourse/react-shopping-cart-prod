import * as S from './styles/SkeletonProduct.styles';

export default function SkeletonProduct() {
  return (
    <S.Wrapper>
      <S.Image />
      <S.InfoBox>
        <S.LabelBox>
          <S.Name />
          <S.Price />
        </S.LabelBox>
      </S.InfoBox>
    </S.Wrapper>
  );
}
