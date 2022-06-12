import { useEffect } from 'react';
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

import { MESSAGES, PASSWORD } from 'constants/index';
import { LeaveButton } from './styles';

function UserInfo() {
  const dispatch = useDispatch();
  const { userName, loading, error }: UserState = useSelector(selectUserState);
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();

  const onClickLeave = async () => {
    if (!window.confirm(MESSAGES.ASK_LEAVE)) {
      return;
    }

    dispatch(
      deleteUserAPI(() => {
        dispatch(show(MESSAGES.COMPLETE_LEAVE));
      })
    );
  };

  const onSubmitEditForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordConfirmErrorMessage) {
      return;
    }

    dispatch(
      changePasswordAPI(password, () => {
        dispatch(show(MESSAGES.COMPLETE_CHANGE_PASSWORD));
      })
    );
  };

  useEffect(() => {
    dispatch(loadUserAPI());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <h1>회원정보 수정</h1>
      <Form onSubmit={onSubmitEditForm}>
        <Input htmlFor="userinfo-id" label="아이디" value={userName ?? ''} disabled={true} />
        <Input
          type="password"
          htmlFor="userinfo-password"
          label="새로운 비밀번호"
          value={password}
          onChange={onChangePassword}
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="userinfo-password-confirm"
          label="새로운 비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
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
