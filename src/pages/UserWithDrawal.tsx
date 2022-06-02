import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useInput from 'hooks/useInput';
import React, { FormEvent } from 'react';
import { deleteUser } from 'redux/user/thunk';

const UserWithDrawal = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useInput();

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteUser({ password }));
  };

  return (
    <AuthPage title='회원 탈퇴' onSubmitAuthForm={onSubmitForm}>
      <LabeledInput
        label='비밀번호'
        type='password'
        id='password3'
        placeholder='비밀번호를 입력해주세요.'
        value={password}
        onChange={setPassword}
      />
    </AuthPage>
  );
};

export default UserWithDrawal;
