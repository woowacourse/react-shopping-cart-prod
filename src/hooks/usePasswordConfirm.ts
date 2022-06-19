import { useState } from 'react';
import { ERROR_MESSAGES } from '@/constants';

const usePasswordConfirm = (password: string) => {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

  const onChangePasswordConfirm = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value.replace(/ /, '');

    setPasswordConfirm(value);
    setPasswordConfirmErrorMessage(
      password !== value ? ERROR_MESSAGES.SIGNUP.INCORRECT_PASSWORD_CONFIRM : ''
    );
  };

  return { passwordConfirm, onChangePasswordConfirm, passwordConfirmErrorMessage };
};

export default usePasswordConfirm;
