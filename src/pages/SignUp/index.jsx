import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Common/Input/Input';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import Form from 'components/Common/Form/Form';

import { showSnackBar } from 'reducers/ui/ui.actions';
import useInputValidate from 'hooks/useInputValidate';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import useAuth from 'hooks/useAuth';
import * as Styled from './style';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pwd = useRef(null);

  const { isSignUpSucceed, isSignUpError, signUp, checkIsAuthenticated } =
    useAuth();
  const [emailValidate, handleEmailBlur] = useInputValidate('email');
  const [nameValidate, handleNameBlur] = useInputValidate('name');
  const [passwordValidate, handlePasswordBlur] = useInputValidate('password');
  const [passwordCheckValidate, handlePasswordCheckBlur] =
    useInputValidate('passwordCheck');

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAllValid =
      emailValidate.isValid &&
      nameValidate.isValid &&
      passwordValidate.isValid &&
      passwordCheckValidate.isValid;

    if (!isAllValid) {
      dispatch(
        showSnackBar({ type: 'ERROR', text: '정보를 올바르게 입력하세요.' }),
      );
      return;
    }

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
    } = e.target.elements;

    signUp({
      email,
      name,
      password,
    });
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isSignUpSucceed) {
      navigate(PATH_NAME.LOGIN);
      dispatch(showSnackBar({ type: 'SUCCESS', text: '회원가입 성공' }));
      return;
    }
    if (isSignUpError) {
      dispatch(
        showSnackBar({ type: 'ERROR', text: '입력한 정보를 확인 하세요.' }),
      );
      return;
    }
  }, [isSignUpSucceed, isSignUpError]);

  return (
    <Styled.Wrapper>
      <Title contents="회원가입" />
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            onBlur={handleEmailBlur()}
            type="email"
            name="email"
          />
          <ValidateText
            text={emailValidate.text}
            isValid={emailValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="이름"
            placeholder="이름을 입력해주세요."
            onBlur={handleNameBlur()}
            name="name"
            type="text"
          />
          <ValidateText
            text={nameValidate.text}
            isValid={nameValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={pwd}
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onBlur={handlePasswordBlur()}
            name="password"
            type="password"
          />
          <ValidateText
            text={passwordValidate.text}
            isValid={passwordValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호 확인"
            placeholder="비밀번호를 확인해주세요."
            onBlur={handlePasswordCheckBlur(pwd.current?.value)}
            name="passwordCheck"
            type="password"
          />
          <ValidateText
            text={passwordCheckValidate.text}
            isValid={passwordCheckValidate.isValid}
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          가입하기
        </Button>
      </Form>
    </Styled.Wrapper>
  );
};

export default SignUp;
