import { useNavigate } from 'react-router-dom';

import useInputValue from 'hooks/useInputValue';

import { sendUpdatePasswordRequest } from 'api/user.api';

import { Form, Input } from 'components/common';

import { ALERT_MESSAGES, ERROR_MESSAGES } from 'constants/messages';
import { PASSWORD_PATTERN } from 'constants/pattern';
import { ROUTE } from 'constants/route';

const { USER_INFO_RULE_ERROR } = ERROR_MESSAGES;

function UserPasswordUpdateForm() {
  const [passwordValue, setPasswordValue, isPasswordValid] =
    useInputValue(PASSWORD_PATTERN);

  const [passwordConfirmValue, setPasswordConfirmValue, isPasswordConfirmValid] =
    useInputValue(PASSWORD_PATTERN);

  const navigate = useNavigate();

  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };
  const handlePasswordConfirmInput = ({ target: { value } }) => {
    setPasswordConfirmValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid || passwordValue !== passwordConfirmValue) {
      alert(ERROR_MESSAGES.INVALID_FORM);
      return;
    }

    try {
      await sendUpdatePasswordRequest(passwordValue);

      alert(ALERT_MESSAGES.USER_PASSWORD_UPDATE_SUCCESS);
      navigate(ROUTE.USER_INFO);
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      name: 'password',
      type: 'password',
      labelText: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
      value: passwordValue,
      onChange: handlePasswordInput,
      isValid: isPasswordValid,
      errorMessage: isPasswordValid ? '' : USER_INFO_RULE_ERROR.INVALID_PASSWORD,
    },
    {
      name: 'password-confirm',
      type: 'password',
      labelText: '비밀번호 확인',
      placeholder: '비밀번호를 다시 입력해주세요',
      value: passwordConfirmValue,
      onChange: handlePasswordConfirmInput,
      isValid: isPasswordConfirmValid,
      errorMessage:
        passwordConfirmValue === '' || passwordValue === passwordConfirmValue
          ? ''
          : USER_INFO_RULE_ERROR.PASSWORD_NO_MATCH,
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

export default UserPasswordUpdateForm;
