import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Profile from 'components/User/Profile/Profile';
import * as Styled from './style';
import Modal from 'components/Common/Modal/Modal';
import { useState, useRef } from 'react';
import Form from 'components/Common/Form/Form';
import Input from 'components/Common/Input/Input';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import useInputValidate from 'hooks/useInputValidate';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import PropTypes from 'prop-types';

const ModifyProfile = () => {
  const [openChangePassworModal, setOpenChangePasswordModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);

  const handleSubmitChangeSubmit = (e) => {
    e.preventDefault();
    const {
      oldPassword: { value: oldPassword },
      password: { value: password },
      passwordCheck: { value: passwordCheck },
    } = e.target.elements;

    console.log('회원정보 수정 모달:', oldPassword, password, passwordCheck);
    setOpenChangePasswordModal(false);
  };

  const handleSubmitWithdrawal = (e) => {
    e.preventDefault();

    const {
      password: { value: password },
    } = e.target.elements;

    console.log('회원 탈퇴 모달:', password);
    setOpenWithdrawalModal(false);
  };

  return (
    <Styled.Wrapper>
      <Title contents="회원정보 수정" />
      <Styled.Contents>
        <Profile name="콜라" />
        <Styled.ButtonContainer>
          <Button
            colorType="primary"
            onClick={() => setOpenChangePasswordModal(true)}
          >
            비밀번호 수정
          </Button>
          <Button
            colorType="tertiary"
            onClick={() => setOpenWithdrawalModal(true)}
          >
            회원 탈퇴
          </Button>
        </Styled.ButtonContainer>
      </Styled.Contents>
      <Modal
        isModalOpened={openChangePassworModal}
        closeModal={() => setOpenChangePasswordModal(false)}
      >
        <ChangePassword onSubmit={handleSubmitChangeSubmit} />
      </Modal>
      <Modal
        isModalOpened={openWithdrawalModal}
        closeModal={() => setOpenWithdrawalModal(false)}
      >
        <Withdrawal onSubmit={handleSubmitWithdrawal} />
      </Modal>
    </Styled.Wrapper>
  );
};

const ChangePassword = ({ onSubmit }) => {
  const newPwd = useRef(null);
  const [oldPasswordValidate, handleOldPasswordBlur] =
    useInputValidate('password');
  const [newPasswordValidate, handleNewPasswordBlur] =
    useInputValidate('password');
  const [newPasswordCheckValidate, handleNewPasswordCheckBlur] =
    useInputValidate('passwordCheck');
  return (
    <>
      <Title contents="비밀번호 수정" />
      <Form onSubmit={onSubmit}>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="기존 비밀번호를 입력하세요."
            onBlur={handleOldPasswordBlur()}
            name="oldPassword"
          />
          <ValidateText
            text={oldPasswordValidate.text}
            isValid={oldPasswordValidate.isValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={newPwd}
            description="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력하세요."
            onBlur={handleNewPasswordBlur()}
            name="password"
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
            onBlur={handleNewPasswordCheckBlur(newPwd.current?.value)}
            name="passwordCheck"
          />
          <ValidateText
            text={newPasswordCheckValidate.text}
            isValid={newPasswordCheckValidate.isValid}
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          완료
        </Button>
      </Form>
    </>
  );
};

const Withdrawal = ({ onSubmit }) => {
  const [passwordValidate, handlePasswordBlur] = useInputValidate('password');
  return (
    <>
      <Title contents="회원 탈퇴" />
      <Form onSubmit={onSubmit}>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="비밀번호를 입력하세요."
            onBlur={handlePasswordBlur()}
            name="password"
          />
          <ValidateText
            text={passwordValidate.text}
            isValid={passwordValidate.isValid}
          />
        </Fieldset>
        <Button colorType="tertiary" type="submit">
          탈퇴
        </Button>
      </Form>
    </>
  );
};

ChangePassword.propTypes = {
  onSubmit: PropTypes.func,
};

Withdrawal.propTypes = {
  onSubmit: PropTypes.func,
};

export default ModifyProfile;
