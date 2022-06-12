import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/modules/user';

import useInput from '@/hooks/useInput';
import usePasswordConfirm from '@/hooks/usePasswordConfirm';

import { LeaveButton } from './styles';

import { Button, Form, Input } from '@/components/@shared';
import PageLayout from '@/components/PageLayout';

import { getUserNameAPI, removeUserInfoAPI, updateUserInfoAPI } from '@/apis/user';
import { removeCookie } from '@/utils';
import { validatePassword } from '@/validations';
import { INFO_MESSAGES } from '@/constants';

function UserInfo() {
  const {
    value: password,
    onChangeValue: onChangePassword,
    errorMessage: passwordErrorMessage,
  } = useInput(validatePassword);

  const { passwordConfirm, passwordConfirmErrorMessage, onChangePasswordConfirm } =
    usePasswordConfirm(password);

  const [userName, setUserName] = useState('LOADING...');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updateUserName = async () => {
      const userName = await getUserNameAPI();

      if (!userName) return;

      setUserName(userName);
    };

    updateUserName();
  }, []);

  const onClickLeave = async () => {
    if (!confirm(INFO_MESSAGES.ASK_LEAVE)) return;

    const result = await removeUserInfoAPI();

    if (!result) return;

    dispatch(logoutUser());
    removeCookie('accessToken');
    navigate(routes.home);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await updateUserInfoAPI(password, userName);

    if (!result) return;

    navigate(routes.home);
  };

  return (
    <PageLayout>
      <h1>회원 정보 수정</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="userinfo-user-name" label="아이디" value={userName} disabled={true} />
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
