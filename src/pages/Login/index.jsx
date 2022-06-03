import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Form from 'components/Common/Form/Form';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import Input from 'components/Common/Input/Input';
import Button from 'components/Common/Button/Button';
import Title from 'components/Common/Title/Title';

import { PATH_NAME } from 'constants';

import useAuth from 'hooks/useAuth';
import useSnackBar from 'hooks/useSnackBar';
import * as Styled from './style';

const Login = () => {
  const navigate = useNavigate();

  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
  const { isLoginSucceed, isLoginError, login, checkIsAuthenticated } =
    useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target.elements;

    if (email.length === 0 || password.length === 0) {
      showErrorSnackBar('정보를 올바르게 입력하세요.');
      return;
    }
    login(email, password);
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isLoginSucceed) {
      showSuccessSnackBar('로그인 성공');
      navigate(PATH_NAME.HOME);
      return;
    }

    if (isLoginError) {
      showErrorSnackBar('로그인 실패');
    }
  }, [isLoginSucceed, isLoginError]);

  return (
    <Styled.Wrapper>
      <Title contents="로그인" />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            type="email"
            name="email"
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          로그인
        </Button>
      </Form>
    </Styled.Wrapper>
  );
};

export default Login;
