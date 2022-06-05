import ModalOverlay from 'components/@shared/Modal';
import Input from 'components/Input';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Title from 'components/Title';
import AuthButton from 'components/AuthButton';
import { useState, useEffect } from 'react';
import Container from 'components/@shared/Container';
import Styled from './index.style';
import { deleteCookie } from 'utils/cookie';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import store from 'store/store';
import { doInitializeCartList, doLogout } from 'actions/actionCreator';
import { useNavigate } from 'react-router-dom';
import { authApiClient } from 'utils/apiClient';

const AccountDeleteModal = ({ handleModal }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  useEffect(() => {
    setIsCorrectPassword(password.length >= 10);
  }, [password]);

  const deleteAccount = async () => {
    try {
      if (!isCorrectPassword) return;

      await authApiClient.delete('/customers', {
        data: {
          password,
        },
      });

      deleteCookie('accessToken');
      store.dispatch(doLogout());
      store.dispatch(doInitializeCartList({ shoppingCart: [] }));
      handleModal();
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_SUCCESS, 'SUCCESS');
      navigate('/');
    } catch (error) {
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_FAILURE, 'FAILED');
    }
  };

  return (
    <ModalOverlay onCloseModal={handleModal}>
      <Container width="505px" height="370px">
        <div>
          <Title mainTitle="회원탈퇴" />
          <Styled.Notification>
            회원탈퇴 처리 후에는 회원님의 개인정보를 복원할 수 없으며, <br />
            회원탈퇴 진행 시 해당 아이디는 영구적으로 삭제되어 재가입이 불가합니다.
          </Styled.Notification>
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="Password"
            inputValue={password}
            setInputValue={setPassword}
          />
          <AuthButton
            actionType="Delete your account"
            action={deleteAccount}
            isDisabled={!isCorrectPassword}
            color="red"
          />
        </div>
      </Container>
    </ModalOverlay>
  );
};

export default AccountDeleteModal;
