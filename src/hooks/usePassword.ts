import { useState } from 'react';
import useInput from 'hooks/useInput';
import { validatePassword } from 'validations';

const usePassword = () => {
  const [password, onChangePassword, passwordErrorMessage] = useInput(validatePassword);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<string>('');

  const onChangePasswordConfirm = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(target.value);
    setPasswordConfirmErrorMessage(
      password !== target.value ? '비밀번호가 일치하지 않습니다.' : ''
    );
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
