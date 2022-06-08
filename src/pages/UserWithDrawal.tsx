import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import Snackbar from 'components/common/Snackbar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useAuthError from 'hooks/useAuthError';
import useInput from 'hooks/useInput';
import useSnackBar, { MESSAGE } from 'hooks/useSnackBar';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from 'redux/user/thunk';
import { PATH } from 'Routers';

const UserWithDrawal = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useInput();
  const navigate = useNavigate();
  const { openSnackbar, setMessage, SnackbarComponent } = useSnackBar();

  useAuthError((message: string) => {
    openSnackbar();
    setMessage(message);
  });

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteUser({ password })).then(() => navigate(PATH.home));
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
      {SnackbarComponent}
    </AuthPage>
  );
};

export default UserWithDrawal;
