import React from 'react';
import { useNavigate } from 'react-router-dom';

import useInputValue from 'hooks/useInputValue';

import { sendCheckPasswordRequest } from 'api/user.api';

import { Form, Input } from 'components/common';

import { ERROR_MESSAGES } from 'constants/messages';

function PasswordCheckForm({ nextPath }) {
  const [passwordValue, setPasswordValue] = useInputValue();

  const navigate = useNavigate();

  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await sendCheckPasswordRequest(passwordValue);

      if (!success) {
        alert(ERROR_MESSAGES.INCORRECT_PASSWORD);
        return;
      }

      navigate(nextPath);
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      name: 'password',
      type: 'password',
      labelText: '회원정보를 수정하기 위해서 비밀번호를 입력해주세요.',
      placeholder: '비밀번호를 입력해주세요',
      value: passwordValue,
      onChange: handlePasswordInput,
    },
  ];
  return (
    <Form buttonText="비밀번호 확인" onSubmit={onSubmit}>
      {inputAttributeList.map((inputDescription) => (
        <Input key={inputDescription.name} {...inputDescription} required={true} />
      ))}
    </Form>
  );
}

export default PasswordCheckForm;
