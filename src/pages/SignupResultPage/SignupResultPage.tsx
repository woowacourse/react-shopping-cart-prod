import DivideLine from '../../components/DivideLine/DivideLine';
import Stepper from '../../components/Stepper/Stepper';
import Button from '../../components/Button/Button';
import * as S from './SignupResultPage.styled';

const SIGNUP_STEPS = [
  {
    id: '/agree-to-term',
    title: '약관동의',
  },
  {
    id: '/fill-info',
    title: '정보입력',
  },
  {
    id: '/completion',
    title: '가입완료',
  },
];

function SignupResultPage() {
  return (
    <S.PageBox>
      <Stepper stepList={SIGNUP_STEPS} currentStepId={SIGNUP_STEPS[2].id} />
      <DivideLine color="gray" thickness="thin" />
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
    </S.PageBox>
  );
}

export default SignupResultPage;
