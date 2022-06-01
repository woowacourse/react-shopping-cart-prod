import styled from 'styled-components';
import DivideLine from '../../components/DivideLine/DivideLine';
import Stepper from '../../components/Stepper/Stepper';
import Button from '../../components/Button/Button';

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
    <PageBox>
      <Stepper stepList={SIGNUP_STEPS} currentStepId={SIGNUP_STEPS[2].id} />
      <DivideLine color="gray" thickness="thin" />
      <ResultBox>
        <Title>반갑습니다.</Title>
        <Paragraph>
          록바님, Woowa Shop의 멤버가 되신 것을
          <br /> 진심으로 축하드립니다!
        </Paragraph>
      </ResultBox>
      <ButtonBox>
        <Button>주문하러 가기</Button>
      </ButtonBox>
    </PageBox>
  );
}

const PageBox = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin: 60px 0 30px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
`;

const Paragraph = styled.p`
  font-size: 2rem;
  text-align: center;
  line-height: 1.3;
`;

const ButtonBox = styled.div`
  width: 300px;
`;

export default SignupResultPage;
