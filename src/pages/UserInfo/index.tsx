import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch } from 'react-redux';
import { logout } from '@/redux/modules/customer';

import usePassword from '@/hooks/usePassword';

import { LeaveButton } from './styles';

import { Button, Form, Input } from '@/components/@shared';
import PageLayout from '@/components/PageLayout';

import { getUserName, removeUserInfo, updateUserInfo } from '@/apis/customer';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updateUserName = async () => {
      const userName = await getUserName();

      setUserName(userName);
    };

    updateUserName();
  }, []);

  const onClickLeave = () => {
    if (!window.confirm('정말 탈퇴하시겠습니까? 🥲')) return;

    removeUserInfo();

    document.cookie = 'accessToken=';
    dispatch(logout());

    navigate(routes.home);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserInfo(password, userName);

    navigate(routes.home);
  };

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
          maxLength={20}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="userinfo-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
      <LeaveButton onClick={onClickLeave}>회원 탈퇴</LeaveButton>
    </PageLayout>
  );
}

export default UserInfo;
