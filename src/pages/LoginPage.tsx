import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import PageHeader from '../components/page/PageHeader';
import useFutureResult from '../hooks/useFutureResult';
import useLoginMutation from '../hooks/useLoginMutation';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 72px;

  width: 100%;
  max-width: 500px;
`;

const Divider = styled.hr`
  border: none;
  margin-top: 48px;
`;

type LoginPageProps = {
  onLoginSuccess?: () => void;
};

const LoginPage = (props: LoginPageProps) => {
  const { onLoginSuccess = () => navigate('/') } = props;

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, future } = useLoginMutation();
  const loginResult = useFutureResult(future);

  const handleLoginSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await login({ username, password });
    onLoginSuccess?.();
  };

  return (
    <>
      <PageHeader>로그인</PageHeader>

      <Content>
        <LoginForm onSubmit={handleLoginSubmit}>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {loginResult.isError && <div>로그인에 실패하였습니다. </div>}

          <Divider />

          <Button type="submit" disabled={loginResult.isLoading}>
            {loginResult.isLoading ? <Spinner /> : '로그인'}
          </Button>
        </LoginForm>
      </Content>
    </>
  );
};

export default LoginPage;
