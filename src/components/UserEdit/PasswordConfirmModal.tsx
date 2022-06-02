import Button from 'components/common/Button';
import LabeledInput from 'components/common/LabeledInput';
import Modal from 'components/common/Modal';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useInput from 'hooks/useInput';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetError } from 'redux/user/action';
import { editUserInfo } from 'redux/user/thunk';
import { PATH } from 'Routers';
import styled from 'styled-components';

interface PasswordConfirmModalProps {
  name: string;
  closeModal: () => void;
}

const PasswordConfirmModal = ({ name, closeModal }: PasswordConfirmModalProps) => {
  const [password, onChangePassword] = useInput();
  const loginId = useAppSelector(state => state.user.data.loginId);
  const { data, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  const onSubmitPassword = () => {
    dispatch(editUserInfo({ loginId, name, password }));
  };

  useEffect(() => {
    if (name === data.name) {
      closeModal();
      navigate(PATH.home);
    }
  }, [data.name]);

  useEffect(() => {
    if (error) {
      openSnackbar();
      dispatch(resetError());
    }
  }, [error]);

  return (
    <Modal closeModal={closeModal}>
      <StyledPasswordConfirmContent>
        <LabeledInput
          label='비밀번호'
          id='password2'
          placeholder='비밀번호를 입력해주세요.'
          type='password'
          value={password}
          onChange={onChangePassword}
          onKeyDown={e => {
            if (e.key === 'Enter') onSubmitPassword();
          }}
        />
        <Button
          type='submit'
          width='300px'
          height='36px'
          color='white'
          fontSize='14px'
          backgroundColor='primary'
          margin='24px 0 0'
          borderRadius='4px'
          onClick={onSubmitPassword}
        >
          확인
        </Button>
        {isOpenSnackbar && <Snackbar message={MESSAGE.password} />}
      </StyledPasswordConfirmContent>
    </Modal>
  );
};

export default PasswordConfirmModal;

const StyledPasswordConfirmContent = styled.div`
  width: 500px;
  padding: 0 100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: white;
`;
