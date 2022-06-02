import Button from '../../../../components/Button/Button';
import * as S from './ResultStep.styled';

function ResultStep() {
  return (
    <>
      <S.ResultBox>
        <S.Title>반갑습니다.</S.Title>
        <S.Paragraph>
          록바님, Woowa Shop의 멤버가 되신 것을
          <br /> 진심으로 축하드립니다!
        </S.Paragraph>
      </S.ResultBox>
      <S.ButtonBox>
        <Button>주문하러 가기</Button>
      </S.ButtonBox>
    </>
  );
}

export default ResultStep;
