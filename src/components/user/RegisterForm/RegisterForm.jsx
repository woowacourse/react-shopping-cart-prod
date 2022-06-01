import React, { useState } from 'react';

import { addUser, checkEmailDuplicate } from 'api/user.api';
import { Form, Input } from 'components/common';
import useInputValue from 'hooks/useInputValue';
import { useNavigate } from 'react-router-dom';
import { ALERT_MESSAGES, ERROR_MESSAGES } from 'constants/messages';

const emailPattern =
  /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
const nicknamePattern = /^[가-힣]{1,5}$/;

function RegisterForm() {
  const [emailValue, setEmailValue, isEmailValid] = useInputValue(emailPattern);

  const [passwordValue, setPasswordValue, isPasswordValid] =
    useInputValue(passwordPattern);

  const [passwordConfirmValue, setPasswordConfirmValue, isPasswordConfirmValid] =
    useInputValue(passwordPattern);

  const [nicknameValue, setNicknameValue, isNicknameValid] =
    useInputValue(nicknamePattern);

  const [isUniqueEmail, setIsUniqueEmail] = useState(false);

  const navigate = useNavigate();

  const handleEmailInput = ({ target: { value } }) => {
    setEmailValue(value);
    setIsUniqueEmail(false);
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
  const handleEmailDuplicateCheck = async () => {
    if (emailValue.length === 0 || !isEmailValid) {
      alert(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    try {
      const success = await checkEmailDuplicate(emailValue);

      setIsUniqueEmail(success);

      if (!success) {
        alert(ERROR_MESSAGES.DUPLICATE_EMAIL);
      }
    } catch ({ message }) {
      setIsUniqueEmail(false);
      alert(message);
    }
  };

  const isAllValid =
    isEmailValid && isPasswordValid && isPasswordConfirmValid && isNicknameValid;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAllValid || !isUniqueEmail || passwordValue !== passwordConfirmValue) {
      alert(ERROR_MESSAGES.INVALID_FORM);
      return;
    }

    try {
      await addUser({
        email: emailValue,
        nickname: nicknameValue,
        password: passwordValue,
      });
      alert(ALERT_MESSAGES.REGISTER_SUCCESS);
      navigate('/login');
    } catch ({ message }) {
      alert(message);
    }
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
      buttonText: isUniqueEmail ? '확인 완료' : '중복 확인',
      isButtonDisabled: isUniqueEmail,
      onButtonClick: handleEmailDuplicateCheck,
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
    <Form buttonText="회원 가입" onSubmit={onSubmit}>
      {inputAttributeList.map((inputDescription) => (
        <Input key={inputDescription.name} {...inputDescription} required={true} />
      ))}
    </Form>
  );
}

export default RegisterForm;
