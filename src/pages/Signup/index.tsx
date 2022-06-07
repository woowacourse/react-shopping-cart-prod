import { useState } from 'react';
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
  const { loading, error }: UserState = useSelector(selectUserState);
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
    try {
      const {
        data: { isDuplicate },
      } = await axios.get(`/api/customers/exists?userName=${id}`);

      const isValid = isDuplicate ? false : true;
      const message = isDuplicate
        ? '이미 가입된 아이디입니다. 다른 아이디를 입력하여 주세요.'
        : '사용 가능한 아이디입니다.';

      setIdStatus({ isValid, message });
    } catch {
      setIdStatus({
        isValid: false,
        message: '중복 체크 중 에러가 발생했습니다. 나중에 다시 시도하세요.',
      });
    }
  };

  const onSubmitSignupForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      signupAPI(id, password, () => {
        dispatch(show('✅ 회원가입이 완료되었습니다.'));
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
          minLength={8}
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
          minLength={8}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button borderRaius="15px">확인</Button>
      </Form>
    </PageLayout>
  );
}

export default Signup;
