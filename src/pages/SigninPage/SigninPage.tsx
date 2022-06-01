import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

function SigninPage() {
  return (
    <PageBox>
      <Title>로그인</Title>
      <Form>
        <Section>
          <Input type="email" placeholder="이메일을 입력해주세요." />
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </Section>
        <Section>
          <Button type="submit">로그인</Button>
          <Button type="button" color="white">
            회원가입
          </Button>
        </Section>
      </Form>
    </PageBox>
  );
}

const PageBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 700;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default SigninPage;
