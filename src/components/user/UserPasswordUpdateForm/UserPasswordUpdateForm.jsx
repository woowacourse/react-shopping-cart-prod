import { useNavigate } from 'react-router-dom';

import useInputValue from 'hooks/useInputValue';

import { sendUpdatePasswordRequest } from 'api/user.api';

import { Form, Input } from 'components/common';

import { USER_INPUT_DEFAULT_ATTR } from 'constants';
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
