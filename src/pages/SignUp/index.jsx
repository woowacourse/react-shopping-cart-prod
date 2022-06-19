import { useRef } from 'react';

import Input from 'components/Common/Input/Input';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import Form from 'components/Common/Form/Form';

import useInputValidate from 'hooks/useInputValidate';

import * as Styled from './style';
import { EMAIL_REGEX } from 'constants';
import { NAME_REGEX } from 'constants';
import { PASSWORD_REGEX } from 'constants';
import { useAuth } from 'hooks/useAuth';
import useSnackBar from 'hooks/useSnackBar';

const SignUp = () => {
  const { signUpApi, duplicateEmailApi } = useAuth();
  const { showErrorSnackBar } = useSnackBar();
  const pwd = useRef(null);

  const {
    isValid: isEmailValid,
    handleBlur: handleEmailBlur,
    text: emailValidText,
  } = useInputValidate({
    validation: (args) => EMAIL_REGEX.test(args),
    validationAsync: (args) => duplicateEmailApi(args),
    successMsg: '멋진 이메일입니다!',
    errorMsg: '영문 소문자, 숫자,특수기호(_)(-)만 사용 가능합니다.',
  });

  const {
    isValid: isNameValid,
    handleBlur: handleNameBlur,
    text: nameValidText,
  } = useInputValidate({
    validation: (args) => NAME_REGEX.test(args),
    successMsg: '멋진 이름입니다!',
    errorMsg: '영문, 한글, 숫자 10글자 이하만 사용하세요.',
  });

  const {
    isValid: isPasswordValid,
    handleBlur: handlePasswordBlur,
    text: passwordValidText,
  } = useInputValidate({
    validation: (args) => PASSWORD_REGEX.test(args),
    successMsg: '안전한 비밀번호입니다!',
    errorMsg:
      '영문 대소문자, 특수문자(!, @, ?, -) 를 포함한 6글자 이상 사용하세요.',
  });

  const {
    isValid: isPasswordCheckValid,
    handleBlur: handlePasswordCheckBlur,
    text: passwordCheckValidText,
  } = useInputValidate({
    validation: (args1, args2) => args1 === args2,
    successMsg: '비밀번호가 일치합니다!',
    errorMsg: '비밀번호가 일치하지 않습니다.',
  });

  const handlSubmit = (e) => {
    e.preventDefault();

    const isAllValid =
      isEmailValid && isNameValid && isPasswordValid && isPasswordCheckValid;

    if (!isAllValid) {
      showErrorSnackBar({ text: '정보를 올바르게 입력하세요.' });

      return;
    }

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
    } = e.target.elements;

    signUpApi({ email, name, password });
  };

  return (
    <Styled.Wrapper>
      <Title contents="회원가입" />
      <Form onSubmit={handlSubmit}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="coke@coke.com"
            onBlur={handleEmailBlur()}
            type="email"
            name="email"
          />
          <ValidateText text={emailValidText} isValid={isEmailValid} />
        </Fieldset>
        <Fieldset>
          <Input
            description="이름"
            placeholder="이름을 입력해주세요."
            onBlur={handleNameBlur()}
            name="name"
            type="text"
          />
          <ValidateText text={nameValidText} isValid={isNameValid} />
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
          <ValidateText text={passwordValidText} isValid={isPasswordValid} />
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
            text={passwordCheckValidText}
            isValid={isPasswordCheckValid}
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
