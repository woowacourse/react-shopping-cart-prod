import React from 'react';

import { Form, Input } from 'components/common';
import useInputValue from 'hooks/useInputValue';
import { useNavigate } from 'react-router-dom';
import { checkPassword } from 'api/userApi';

function PasswordCheckForm({ nextPath }) {
  const [passwordValue, setPasswordValue] = useInputValue();

  const navigate = useNavigate();

  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await checkPassword(passwordValue);

      if (!success) {
        alert('비밀번호가 올바르지 않습니다.');
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
