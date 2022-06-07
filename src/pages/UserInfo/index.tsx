import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePasswordAPI,
  deleteUserAPI,
  loadUserAPI,
  selectUserState,
  UserState,
} from 'redux/modules/user';
import { show } from 'redux/modules/snackBar';

import usePassword from 'hooks/usePassword';
import { Button, Form, Input, Loader } from 'components/@shared';
import { PageLayout } from 'components';

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

    dispatch(deleteUserAPI());
  };

  const onSubmitEditForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      changePasswordAPI(password, () => {
        dispatch(show('✅ 비밀번호가 변경되었습니다.'));
      })
    );
  };

  useEffect(() => {
    dispatch(loadUserAPI());
  }, []);

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
      <Form onSubmit={onSubmitEditForm}>
        <Input htmlFor="userinfo-id" label="아이디" value={userName ?? ''} disabled={true} />
        <Input
          type="password"
          htmlFor="userinfo-password"
          label="새로운 비밀번호"
          value={password}
          onChange={onChangePassword}
          minLength={8}
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
          minLength={8}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button borderRaius="15px">확인</Button>
      </Form>
      <LeaveButton onClick={onClickLeave} borderRaius="15px">
        회원 탈퇴
      </LeaveButton>
    </PageLayout>
  );
}

export default UserInfo;
