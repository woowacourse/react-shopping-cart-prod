import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInputValue from 'hooks/useInputValue';

import { sendAddUserRequest, sendCheckEmailDuplicateRequest } from 'api/user.api';

import { Form, Input } from 'components/common';

import { USER_INPUT_DEFAULT_ATTR } from 'constants';
import { ALERT_MESSAGES, ERROR_MESSAGES } from 'constants/messages';
import { EMAIL_PATTERN, NICKNAME_PATTERN, PASSWORD_PATTERN } from 'constants/pattern';
import { ROUTE } from 'constants/route';

const { USER_INFO_RULE_ERROR } = ERROR_MESSAGES;

function RegisterForm() {
  const [emailValue, setEmailValue, isEmailValid] = useInputValue(EMAIL_PATTERN);
  const [passwordValue, setPasswordValue, isPasswordValid] =
    useInputValue(PASSWORD_PATTERN);
  const [passwordConfirmValue, setPasswordConfirmValue, isPasswordConfirmValid] =
    useInputValue(PASSWORD_PATTERN);
  const [nicknameValue, setNicknameValue, isNicknameValid] =
    useInputValue(NICKNAME_PATTERN);

  const [isUniqueEmail, setIsUniqueEmail] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailInput = ({ target: { value } }) => {
    setEmailValue(value);
    setIsUniqueEmail(false);

    if (!isEmailValid) {
      setEmailErrorMessage(USER_INFO_RULE_ERROR.INVALID_EMAIL);
      return;
    }
    setEmailErrorMessage('');
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
  const handleEmailDuplicateCheck = async ({ target }) => {
    if (emailValue.length === 0 || !isEmailValid) {
      setEmailErrorMessage(USER_INFO_RULE_ERROR.INVALID_EMAIL);
      return;
    }

    try {
      target.disabled = true;
      const success = await sendCheckEmailDuplicateRequest(emailValue);

      setIsUniqueEmail(success);

      if (!success) {
        setEmailErrorMessage(USER_INFO_RULE_ERROR.DUPLICATE_EMAIL);
        target.disabled = false;
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
    if (!isUniqueEmail) {
      alert(ERROR_MESSAGES.NO_DUPLICATE_CHECK);
      return;
    }
    if (!isAllValid || passwordValue !== passwordConfirmValue) {
      alert(ERROR_MESSAGES.INVALID_FORM);
      return;
    }

    try {
      await sendAddUserRequest({
        email: emailValue,
        nickname: nicknameValue,
        password: passwordValue,
      });
      alert(ALERT_MESSAGES.REGISTER_SUCCESS);
      navigate(ROUTE.LOGIN);
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      ...USER_INPUT_DEFAULT_ATTR.EMAIL,
      value: emailValue,
      onChange: handleEmailInput,
      isValid: isEmailValid,
      buttonText: isUniqueEmail ? '확인 완료' : '중복 확인',
      isButtonDisabled: isUniqueEmail,
      onButtonClick: handleEmailDuplicateCheck,
      errorMessage: emailErrorMessage,
    },
    {
      ...USER_INPUT_DEFAULT_ATTR.PASSWORD,
      value: passwordValue,
      onChange: handlePasswordInput,
      isValid: isPasswordValid,
      errorMessage: isPasswordValid ? '' : USER_INFO_RULE_ERROR.INVALID_PASSWORD,
    },
    {
      ...USER_INPUT_DEFAULT_ATTR.PASSWORD_CONFIRM,
      value: passwordConfirmValue,
      onChange: handlePasswordConfirmInput,
      isValid: isPasswordConfirmValid,
      errorMessage:
        passwordConfirmValue === '' || passwordValue === passwordConfirmValue
          ? ''
          : USER_INFO_RULE_ERROR.PASSWORD_NO_MATCH,
    },
    {
      ...USER_INPUT_DEFAULT_ATTR.NICKNAME,
      value: nicknameValue,
      onChange: handleNicknameInput,
      isValid: isNicknameValid,
      errorMessage: isNicknameValid ? '' : USER_INFO_RULE_ERROR.INVALID_NICKNAME,
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
