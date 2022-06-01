import styled from 'styled-components';
import Checkbox from '../../components/Checkbox/Checkbox';
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

function TermsPage() {
  const handleSubmit = () => {};
  return (
    <PageBox>
      <Stepper stepList={SIGNUP_STEPS} currentStepId={SIGNUP_STEPS[0].id} />
      <DivideLine color="gray" thickness="thin" />
      <TermsBox>
        <Title>약관동의</Title>
        <Paragraph>Woowa Shop 서비스 이용약관에 동의해주세요.</Paragraph>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label>
              <Checkbox />
              모든 이용약관에 동의합니다.
            </Label>
          </FormItem>
          <DivideLine color="lightGray" thickness="thin" />
          <FormItem>
            <Label>
              <Checkbox />
              (필수) 서비스 이용 약관
            </Label>
            <TermDetailButton>상세보기</TermDetailButton>
          </FormItem>
          <FormItem>
            <Label>
              <Checkbox />
              (필수) 개인 정보 취급 방침
            </Label>
            <TermDetailButton>상세보기</TermDetailButton>
          </FormItem>
        </Form>
        <SubmitButtonBox>
          <Button type="submit">다음으로</Button>
        </SubmitButtonBox>
      </TermsBox>
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

const TermsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-weight: 700;
`;
const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TermDetailButton = styled.button`
  padding: 5px 30px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  border-radius: 50px;

  :hover {
    background: ${({ theme: { colors } }) => colors.lightGray};
  }
`;

const SubmitButtonBox = styled.div`
  width: 300px;
  margin: 24px auto 0;
`;

export default TermsPage;
