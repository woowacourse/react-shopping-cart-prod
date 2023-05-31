import { S } from './PointInput.styles';

const PointInput = () => {
  return (
    <S.Wrapper>
      <S.PointLabel>사용 포인트</S.PointLabel>
      <S.InputWrapper>
        <S.Input type="text" placeholder="0원" />
        <S.PointButton>전액사용</S.PointButton>
      </S.InputWrapper>
    </S.Wrapper>
  );
};

export default PointInput;
