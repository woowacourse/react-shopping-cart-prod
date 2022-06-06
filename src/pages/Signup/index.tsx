import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, signupAPI, UserState } from 'redux/modules/user';
import { show } from 'redux/modules/snackBar';

import useInput from 'hooks/useInput';
import usePassword from 'hooks/usePassword';
import { Button, Form, Input, Loader } from 'components/@shared';
import { PageLayout } from 'components';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signUpFinish }: UserState = useSelector(selectUserState);
  const [id, onChangeId] = useInput();
  const [idStatus, setIdStatus] = useState({
    isValid: false,
    message: '',
  });
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();

  const onBlurDuplicateCheck = async () => {
    const { data: isDuplicatedId } = await axios.post('/api/customers/duplication', {
      userName: id,
    });

    if (isDuplicatedId) {
      setIdStatus({
        isValid: false,
        message: '이미 가입된 아이디입니다. 다른 아이디를 입력하여 주세요.',
      });
      return;
    }

    setIdStatus({ isValid: true, message: '사용 가능한 아이디입니다.' });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(signupAPI(id, password));
  };

  useEffect(() => {
    if (signUpFinish) {
      navigate(routes.login);
      dispatch(show('회원가입 완료 ✅'));
    }
  }, [signUpFinish]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <Input
          htmlFor="signup-id"
          label="아이디"
          value={id}
          onChange={onChangeId}
          maxLength={10}
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
          maxLength={20}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="signup-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
    </PageLayout>
  );
}

export default Signup;
