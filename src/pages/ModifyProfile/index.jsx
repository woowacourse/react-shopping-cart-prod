import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Profile from 'components/User/Profile/Profile';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Input from 'components/Common/Input/Input';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import Withdrawal from './Withdrawal';

import useInputValidate from 'hooks/useInputValidate';
import useModifyProfilePage from './hooks';
import useSnackBar from 'hooks/useSnackBar';
import useModal from 'hooks/useModal';
import PropTypes from 'prop-types';
import * as Styled from './style';

const ModifyProfile = () => {
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
  const { name } = useSelector((state) => state.user);
  const [
    isModifyPasswordModalOpened,
    openModifyPasswordModal,
    closeModifyPasswordModal,
  ] = useModal();
  const [isWithdrawalModalOpened, openWithdrawalModal, closeWithdrawalModal] =
    useModal();
  const { updatePassword, isUpdatePasswordSucceed, isUpdatePasswordError } =
    useModifyProfilePage();
  const handleSubmitChangeSubmit = (isValid) => (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    const {
      oldPassword: { value: oldPassword },
      password: { value: password },
    } = e.target.elements;
    updatePassword(oldPassword, password);
  };

  useEffect(() => {
    if (isUpdatePasswordSucceed) {
      closeModifyPasswordModal();
      showSuccessSnackBar('비밀번호가 성공적으로 변경되었습니다.');
      return;
    }
    if (isUpdatePasswordError) {
      showErrorSnackBar('비밀번호를 올바르게 입력하세요.');
      return;
    }
  }, [isUpdatePasswordSucceed, isUpdatePasswordError]);

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
        <ModifyPassword onSubmit={handleSubmitChangeSubmit} />
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

const ModifyPassword = ({ onSubmit }) => {
  const newPasswordRef = useRef(null);
  const [oldPasswordValidate, handleOldPasswordBlur] =
    useInputValidate('password');
  const [newPasswordValidate, handleNewPasswordBlur] =
    useInputValidate('password');
  const [newPasswordCheckValidate, handleNewPasswordCheckBlur] =
    useInputValidate('passwordCheck');

  const isAllValid =
    oldPasswordValidate.isValid &&
    newPasswordValidate.isValid &&
    newPasswordCheckValidate.isValid;

  return (
    <>
      <Title contents="비밀번호 수정" />
      <form onSubmit={onSubmit(isAllValid)}>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="기존 비밀번호를 입력하세요."
            onBlur={handleOldPasswordBlur()}
            name="oldPassword"
            type="password"
          />
          <ValidateText
            text={oldPasswordValidate.text}
            isValid={oldPasswordValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={newPasswordRef}
            description="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력하세요."
            onBlur={handleNewPasswordBlur()}
            name="password"
            type="password"
          />
          <ValidateText
            text={newPasswordValidate.text}
            isValid={newPasswordValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호를 확인하세요."
            onBlur={handleNewPasswordCheckBlur(newPasswordRef.current?.value)}
            name="passwordCheck"
            type="password"
          />
          <ValidateText
            text={newPasswordCheckValidate.text}
            isValid={newPasswordCheckValidate.isValid}
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          완료
        </Button>
      </form>
    </>
  );
};

ModifyPassword.propTypes = {
  onSubmit: PropTypes.func,
};

export default ModifyProfile;
