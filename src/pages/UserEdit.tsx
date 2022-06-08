import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import Snackbar from 'components/common/Snackbar';
import PasswordConfirmModal from 'components/UserEdit/PasswordConfirmModal';
import { useAppSelector } from 'hooks/useAppSelector';
import useInput from 'hooks/useInput';
import useSnackBar, { MESSAGE } from 'hooks/useSnackBar';
import { useReducer } from 'react';

const UserEdit = () => {
  const [name, onChangeName] = useInput();
  const [isShowModal, toggleModal] = useReducer(prev => !prev, false);
  const prevName = useAppSelector(state => state.user.data?.name);
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === prevName) {
      openSnackbar();

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
      {isOpenSnackbar && <Snackbar message={MESSAGE.editUser} />}
    </AuthPage>
  );
};

export default UserEdit;
