import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUserThunk } from 'store/actions/user.action';

import useInputValue from 'hooks/useInputValue';

import { Form, Input } from 'components/common';

import { USER_INPUT_DEFAULT_ATTR } from 'constants';
import { ROUTE } from 'constants/route';

function LoginForm() {
  const [emailValue, setEmailValue] = useInputValue();
  const [passwordValue, setPasswordValue] = useInputValue();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailInput = ({ target: { value } }) => {
    setEmailValue(value);
  };

  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUserThunk({
          email: emailValue,
          password: passwordValue,
        }),
      );

      navigate(ROUTE.HOME);
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      ...USER_INPUT_DEFAULT_ATTR.EMAIL,
      value: emailValue,
      onChange: handleEmailInput,
    },
    {
      ...USER_INPUT_DEFAULT_ATTR.PASSWORD,
      value: passwordValue,
      onChange: handlePasswordInput,
    },
  ];
  return (
    <Form buttonText="로그인" onSubmit={onSubmit}>
      {inputAttributeList.map((inputDescription) => (
        <Input key={inputDescription.name} {...inputDescription} required={true} />
      ))}
    </Form>
  );
}

export default LoginForm;
