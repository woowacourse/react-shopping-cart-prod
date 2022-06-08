import { useSelector } from 'react-redux';
import Profile from 'components/User/Profile/Profile';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Withdrawal from './Withdrawal';
import ModifyPassword from './ModifyPassword';

import useAuthorization from 'hooks/useAuthorization';
import useModal from 'hooks/useModal';
import * as Styled from './style';
import { AUTHORIZATION_TYPE } from 'constants';
import { useEffect } from 'react';
import useCart from 'hooks/useCart';
import useAuthentication from 'hooks/useAuthentication';

const ModifyProfile = () => {
  useAuthorization(AUTHORIZATION_TYPE.PRIVATE_ONLY);
  const { cartItems, getItems } = useCart();
  const { name } = useSelector((state) => state.user);
  const { checkIsAuthenticated } = useAuthentication();

  const [
    isModifyPasswordModalOpened,
    openModifyPasswordModal,
    closeModifyPasswordModal,
  ] = useModal();
  const [isWithdrawalModalOpened, openWithdrawalModal, closeWithdrawalModal] =
    useModal();

  useEffect(() => {
    if (!cartItems) {
      getItems();
    }
    checkIsAuthenticated();
  }, []);

  return (
    <Styled.Wrapper>
      <Title contents="회원정보 수정" />
      <Styled.Contents>
        <Profile name={name} />
        <Styled.ButtonContainer>
          <Button colorType="primary" onClick={openModifyPasswordModal}>
            비밀번호 수정
          </Button>
          <Button colorType="tertiary" onClick={openWithdrawalModal}>
            회원 탈퇴
          </Button>
        </Styled.ButtonContainer>
      </Styled.Contents>
      <Modal
        isModalOpened={isModifyPasswordModalOpened}
        closeModal={closeModifyPasswordModal}
      >
        <ModifyPassword closeModal={closeModifyPasswordModal} />
      </Modal>
      <Modal
        isModalOpened={isWithdrawalModalOpened}
        closeModal={closeWithdrawalModal}
      >
        <Withdrawal />
      </Modal>
    </Styled.Wrapper>
  );
};

export default ModifyProfile;
