import { Modal, Container, Input, Title, AuthButton } from 'components';

import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { useState, useEffect } from 'react';

import Styled from './index.style';
import { deleteCookie } from 'utils/cookie';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import { doInitializeCartList, doLogout } from 'actions/actionCreator';
import { useNavigate } from 'react-router-dom';
import { authApiClient } from 'apis/apiClient';
import { useDispatch } from 'react-redux';

const AccountDeleteModal = ({ handleModal }) => {
  const dispatch = useDispatch();
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
      dispatch(doLogout());
      dispatch(doInitializeCartList({ shoppingCart: [] }));
      handleModal();
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_SUCCESS, 'SUCCESS');
      navigate('/');
    } catch (error) {
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_FAILURE, 'FAILED');
    }
  };

  return (
    <Modal onCloseModal={handleModal}>
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
            autoFocus={true}
          />
          <AuthButton
            actionType="Delete your account"
            action={deleteAccount}
            isDisabled={!isCorrectPassword}
            color="red"
          />
        </div>
      </Container>
    </Modal>
  );
};

export default AccountDeleteModal;
