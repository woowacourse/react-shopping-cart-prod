import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

import axios from 'axios';

import useInput from '../../hooks/useInput';

import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

function Login() {
  const navigate = useNavigate();
  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await axios.post('/api/login', { userName: id, password });

    document.cookie = `accessToken=${data}`;
  };

  return (
    <PageLayout>
      <h1>로그인</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="login-id" label="아이디" value={id} onChange={onChangeId} />
        <Input
          type="password"
          htmlFor="login-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <Button>확인</Button>
      </Form>
      <p>
        아직 회원이 아니신가요? <span onClick={() => navigate(routes.signup)}>회원가입</span>
      </p>
    </PageLayout>
  );
}

export default Login;
