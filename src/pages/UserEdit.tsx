import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import PasswordConfirmModal from 'components/UserEdit/PasswordConfirmModal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useInput from 'hooks/useInput';
import { useEffect, useReducer } from 'react';
import { getUser } from 'redux/user/thunk';

const UserEdit = () => {
  const [name, onChangeName] = useInput();
  const [isShowModal, toggleModal] = useReducer(prev => !prev, false);
  const dispatch = useAppDispatch();

  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getUser());
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
    </AuthPage>
  );
};

export default UserEdit;
