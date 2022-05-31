import React, { useState } from 'react';

import { Form, Input, PageTemplate, PageTitle } from 'components/common';
import useInputValue from 'hooks/useInputValue';

const emailPattern =
  /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
const nicknamePattern = /^[가-힣]{1,5}$/;

function Register() {
  const [emailValue, setEmailValue, isEmailValid] = useInputValue(emailPattern);

  const [passwordValue, setPasswordValue, isPasswordValid] =
    useInputValue(passwordPattern);

  const [passwordConfirmValue, setPasswordConfirmValue, isPasswordConfirmValid] =
    useInputValue(passwordPattern);

  const [nicknameValue, setNicknameValue, isNicknameValid] =
    useInputValue(nicknamePattern);

  const [isUniqueEmail, setIsUniqueEmail] = useState(true);

  const handleEmailInput = ({ target: { value } }) => {
    setEmailValue(value);
  };
  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };
  const handlePasswordConfirmInput = ({ target: { value } }) => {
    setPasswordConfirmValue(value);
  };
  const handleNicknameInput = ({ target: { value } }) => {
    setNicknameValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      isNicknameValid &&
      passwordValue === passwordConfirmValue &&
      isUniqueEmail
    ) {
      // submit
      return;
    }
    alert('땡!');
  };

  const inputAttributeList = [
    {
      name: 'email',
      type: 'email',
      labelText: '이메일 주소',
      placeholder: 'example@woowacourse.com',
      value: emailValue,
      onChange: handleEmailInput,
      isValid: isEmailValid,
      buttonText: '중복 확인',
      onButtonClick: () => console.log('중복확인 버튼 클릭'),
    },
    {
      name: 'password',
      type: 'password',
      labelText: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
      value: passwordValue,
      onChange: handlePasswordInput,
      isValid: isPasswordValid,
    },
    {
      name: 'password-confirm',
      type: 'password',
      labelText: '비밀번호 확인',
      placeholder: '비밀번호를 다시 입력해주세요',
      value: passwordConfirmValue,
      onChange: handlePasswordConfirmInput,
      isValid: isPasswordConfirmValid,
    },
    {
      name: 'nickname',
      type: 'text',
      labelText: '닉네임',
      placeholder: '블링',
      value: nicknameValue,
      onChange: handleNicknameInput,
      isValid: isNicknameValid,
    },
  ];
  return (
    <PageTemplate>
      <PageTitle>회원가입</PageTitle>
      <Form buttonText="회원 가입" onSubmit={onSubmit}>
        {inputAttributeList.map((inputDescription) => (
          <Input key={inputDescription.name} {...inputDescription} />
        ))}
      </Form>
    </PageTemplate>
  );
}

export default Register;
