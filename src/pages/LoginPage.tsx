import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import AwaitFuture from '../components/utils/AwaitFuture';
import useLoginMutation from '../hooks/useLoginMutation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, future } = useLoginMutation();

  const handleLoginSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    login({ username, password });
  };

  return (
    <>
      <PageHeader>로그인</PageHeader>

      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {future && (
          <AwaitFuture
            future={future}
            loadingElement={<div>로그인 중...</div>}
            errorElement={<div>로그인 실패...</div>}
          >
            {(profile) => <div>로그인 성공!</div>}
          </AwaitFuture>
        )}

        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default LoginPage;
