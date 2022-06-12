import { useState } from 'react';
import useInput from 'hooks/useInput';

import { validatePassword } from 'validations';
import { MESSAGES } from 'constants/index';

const usePassword = () => {
  const [password, onChangePassword, passwordErrorMessage] = useInput(validatePassword);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<string>('');

  const onChangePasswordConfirm = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(target.value);
    setPasswordConfirmErrorMessage(password !== target.value ? MESSAGES.MISMATCH_PASSWORD : '');
  };

  return {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  };
};

export default usePassword;
