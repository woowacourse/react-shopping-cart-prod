import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { leaveUserAPI, loadUserAPI, selectUserState, UserState } from 'redux/modules/user';

import usePassword from 'hooks/usePassword';
import { Button, Form, Input, Loader } from 'components/@shared';
import { PageLayout } from 'components';

import { getCookie } from 'utils';
import { LeaveButton } from './styles';

function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName, loading, error }: UserState = useSelector(selectUserState);
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();

  const onClickLeave = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까? 🥲')) {
      return;
    }

    dispatch(leaveUserAPI());
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put(
      '/api/customers/me',
      { password },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );

    navigate(routes.home);
  };

  useEffect(() => {
    dispatch(loadUserAPI());
  }, []);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(routes.home);
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <h1>회원 정보 수정</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="userinfo-id" label="아이디" value={userName ?? ''} disabled={true} />
        <Input
          type="password"
          htmlFor="userinfo-password"
          label="새로운 비밀번호"
          value={password}
          onChange={onChangePassword}
          maxLength={20}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="userinfo-password-confirm"
          label="새로운 비밀번호 확인"
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
