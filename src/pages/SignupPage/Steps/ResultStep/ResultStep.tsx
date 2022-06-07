import * as S from 'pages/SignupPage//Steps/ResultStep/ResultStep.styled';

import Button from 'components/Button/Button';
import PlainLink from 'components/PlainLink/PlainLink';

function ResultStep() {
  return (
    <>
      <S.ResultBox>
        <S.Title>반갑습니다.</S.Title>
        <S.Paragraph>
          Woowa Shop의 멤버가 되신 것을
          <br /> 진심으로 축하드립니다!
        </S.Paragraph>
      </S.ResultBox>
      <S.ButtonBox>
        <PlainLink to="/signin">
          <Button>로그인하러 가기</Button>
        </PlainLink>
      </S.ButtonBox>
    </>
  );
}

export default ResultStep;
