import React from 'react';

import { useNavigate } from 'react-router-dom';

import useInputValue from 'hooks/useInputValue';
import useReduxState from 'hooks/useReduxState';

import { Form, Input } from 'components/common';
import { updateUserNicknameThunk } from 'store/actions/user.action';
import { ALERT_MESSAGES, ERROR_MESSAGES } from 'constants/messages';
import { nicknameSelector } from 'store/selector';
import { ROUTE } from 'constants/route';
import { NICKNAME_PATTERN } from 'constants/pattern';

const { USER_INFO_RULE_ERROR } = ERROR_MESSAGES;

function UserInfoUpdateForm() {
  const [nickname, dispatch] = useReduxState(nicknameSelector);

  const [nicknameValue, setNicknameValue, isNicknameValid] = useInputValue(
    NICKNAME_PATTERN,
    nickname,
  );

  const navigate = useNavigate();

  const handleNicknameInput = ({ target: { value } }) => {
    setNicknameValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isNicknameValid) {
      alert(ERROR_MESSAGES.INVALID_FORM);
      return;
    }

    try {
      dispatch(updateUserNicknameThunk(nicknameValue));
      alert(ALERT_MESSAGES.USER_INFO_UPDATE_SUCCESS);
      navigate(ROUTE.USER_INFO);
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      name: 'nickname',
      type: 'text',
      labelText: '닉네임',
      placeholder: '블링',
      value: nicknameValue,
      onChange: handleNicknameInput,
      isValid: isNicknameValid,
      errorMessage: isNicknameValid ? '' : USER_INFO_RULE_ERROR.INVALID_NICKNAME,
    },
  ];
  return (
    <Form buttonText="수정 완료" onSubmit={onSubmit}>
      {inputAttributeList.map((inputDescription) => (
        <Input key={inputDescription.name} {...inputDescription} required={true} />
      ))}
    </Form>
  );
}

export default UserInfoUpdateForm;
