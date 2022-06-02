import { useState, useEffect } from 'react';

import axios from 'axios';

import usePassword from '../../hooks/usePassword';

import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

import { getCookie } from '../../utils';

function UserInfo() {
  const [userName, setUserName] = useState('');
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(
      '/api/customers/me',
      { password },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('/api/customers/me', {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      setUserName(response.data);
    };

    getUser();
  });

  return (
    <PageLayout>
      <h1>회원 정보 수정</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="userinfo-id" label="아이디" value={userName} disabled={true} />
        <Input
          type="password"
          htmlFor="userinfo-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="userinfo-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
      <Button
        onClick={() => {
          axios.delete('/api/customers/me', {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          });
        }}
      >
        회원 탈퇴
      </Button>
    </PageLayout>
  );
}

export default UserInfo;
