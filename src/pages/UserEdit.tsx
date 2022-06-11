import AuthForm from 'components/common/AuthForm';
import LabeledInput from 'components/common/LabeledInput';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import PasswordConfirmModal from 'components/UserEdit/PasswordConfirmModal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useInput from 'hooks/useInput';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect, useReducer, FormEvent } from 'react';
import { getUser } from 'redux/user/thunk';

const UserEdit = () => {
  const [name, onChangeName] = useInput();
  const [isShowModal, toggleModal] = useReducer(prev => !prev, false);
  const dispatch = useAppDispatch();
  const prevName = useAppSelector(state => state.user.data?.name);
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onSubmitAuthForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === prevName) {
      openSnackbar();

      return;
    }

    toggleModal();
  };

  return (
    <AuthForm title='회원 정보 수정' onSubmitAuthForm={onSubmitAuthForm}>
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
    </AuthForm>
  );
};

export default UserEdit;
