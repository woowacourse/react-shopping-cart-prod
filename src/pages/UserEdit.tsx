import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import PasswordConfirmModal from 'components/UserEdit/PasswordConfirmModal';
import { useAppSelector } from 'hooks/useAppSelector';
import useInput from 'hooks/useInput';
import useSnackBar, { MESSAGE } from 'hooks/useSnackBar';
import { useReducer } from 'react';

const UserEdit = () => {
  const [name, onChangeName] = useInput();
  const [isShowModal, toggleModal] = useReducer(prev => !prev, false);
  const prevName = useAppSelector(state => state.user.data?.name);
  const { openSnackbar, SnackbarComponent } = useSnackBar();

  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === prevName) {
      openSnackbar(MESSAGE.editUser);

      return;
    }

    toggleModal();
  };

  return (
    <AuthPage title='회원 정보 수정' onSubmitAuthForm={onSubmitAuthForm}>
      <LabeledInput
        label='이름'
        id='name'
        type='text'
        placeholder='이름을 입력해주세요'
        name={name}
        onChange={onChangeName}
      />
      {isShowModal && <PasswordConfirmModal closeModal={toggleModal} name={name} />}
      <SnackbarComponent />
    </AuthPage>
  );
};

export default UserEdit;
