import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

function Signup() {
  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form>
        <Input htmlFor="signup-id" label="아이디" />
        <Input type="password" htmlFor="signup-password" label="비밀번호" />
        <Input type="password" htmlFor="signup-password-confirm" label="비밀번호 확인" />
      </Form>
    </PageLayout>
  );
}

export default Signup;
