import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

function Login() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <h1>로그인</h1>
      <Form>
        <Input htmlFor="login-id" label="아이디" />
        <Input type="password" htmlFor="login-password" label="비밀번호" />
      </Form>
      <p>
        아직 회원이 아니신가요? <span onClick={() => navigate(routes.signup)}>회원가입</span>
      </p>
    </PageLayout>
  );
}

export default Login;
