import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import apiClient from 'api';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, signupAPI, UserState } from 'redux/modules/user';
import { show } from 'redux/modules/snackBar';

import useInput from 'hooks/useInput';
import usePassword from 'hooks/usePassword';
import { Button, Form, Input, Loader } from 'components/@shared';
import { PageLayout } from 'components';

import { MESSAGES, PASSWORD, ID } from 'constants/index';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error }: UserState = useSelector(selectUserState);
  const [id, onChangeId] = useInput();
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();
  const [idStatus, setIdStatus] = useState({
    isValid: false,
    message: '',
  });

  const onBlurDuplicateCheck = async () => {
    try {
      const { data: isDuplicate } = await apiClient.get(`/api/customers/exist?userName=${id}`);
      const isValid = isDuplicate ? false : true;
      const message = isDuplicate ? MESSAGES.EXIST_ID : MESSAGES.AVAILABLE_ID;

      setIdStatus({ isValid, message });
    } catch {
      setIdStatus({ isValid: false, message: MESSAGES.CHECK_DUPLICATE_ID_ERROR });
    }
  };

  const onSubmitSignupForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      signupAPI(id, password, () => {
        dispatch(show(MESSAGES.COMPLETE_SIGNUP));
        navigate(routes.login);
      })
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmitSignupForm}>
        <Input
          htmlFor="signup-id"
          label="아이디"
          value={id}
          onChange={onChangeId}
          minLength={ID.MIN_LENGTH}
          maxLength={ID.MAX_LENGTH}
          isValid={idStatus.isValid}
          message={idStatus.message}
          onBlur={onBlurDuplicateCheck}
        />
        <Input
          type="password"
          htmlFor="signup-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="signup-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button borderRaius="15px">확인</Button>
      </Form>
    </PageLayout>
  );
}

export default Signup;
