import { useState, useEffect } from 'react';
import axios from 'axios';
import useSnackbar from 'hooks/useSnackbar';

import { Modal, Input, Title, AuthButton, Container } from 'components';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { getCookie } from 'utils/cookie';
import { MESSAGE } from 'utils/constants';
import Styled from './index.style';

const AccountDeleteModal = ({ handleModal }) => {
  const [renderSnackbar] = useSnackbar();

  const [password, setPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  useEffect(() => {
    setIsCorrectPassword(password.length >= 10);
  }, [password]);

  const deleteAccount = async () => {
    try {
      if (!isCorrectPassword) return;

      const accessToken = getCookie('accessToken');

      await axios.delete('/customers', {
        data: {
          password,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      renderSnackbar(MESSAGE.DELETE_ACCOUNT_SUCCESS, 'SUCCESS');
      handleModal();
    } catch (error) {
      renderSnackbar(MESSAGE.DELETE_ACCOUT_FAILUER, 'FAILED');
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
