import { useState, useEffect } from 'react';
import { Modal, Container, Input, Title, AuthButton } from 'components';
import Styled from './index.style';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import useDeleteAccountAPI from 'page/AccountPage/AccountDeleteModal/useDeleteAccountAPI';

const AccountDeleteModal = ({ handleModal }) => {
  const [password, setPassword] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const { deleteAccount } = useDeleteAccountAPI(handleModal, password, isCorrectPassword);

  useEffect(() => {
    setIsCorrectPassword(password.length >= 10);
  }, [password.length]);

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
