import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Profile from 'components/User/Profile/Profile';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Form from 'components/Common/Form/Form';
import Input from 'components/Common/Input/Input';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';

import useInputValidate from 'hooks/useInputValidate';
import PropTypes from 'prop-types';
import * as Styled from './style';
import { PASSWORD_REGEX } from 'constants';
import { useAuth } from 'hooks/useAuth';

const ModifyProfile = () => {
  const { updatePasswordApi, unRegisterApi } = useAuth();
  const { name } = useSelector((state) => state.user);
  const [openChangePassworModal, setOpenChangePasswordModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);

  const handleSubmitChangeSubmit = (isValid) => (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    const {
      oldPassword: { value: oldPassword },
      password: { value: password },
    } = e.target.elements;

    updatePasswordApi({
      oldPassword,
      newPassword: password,
    }).then(() => {
      setOpenChangePasswordModal(false);
    });
  };

  const handleSubmitWithdrawal = (e) => {
    e.preventDefault();

    // TODO 비밀번호 타이핑 하는 거 말고 다른 방식으로 바꿀 것!
    // const {
    //   password: { value: password },
    // } = e.target.elements;

    unRegisterApi().then(() => {
      setOpenWithdrawalModal(false);
    });
  };

  return (
    <Styled.Wrapper>
      <Title contents="회원정보 수정" />
      <Styled.Contents>
        <Profile name={name} />
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
  const {
    isValid: isOldPasswordValid,
    handleBlur: handleOldPasswordBlur,
    text: oldPasswordValidText,
  } = useInputValidate({
    validation: (args) => args.trim().length > 0,
    successMsg: '',
    errorMsg: '비밀번호를 입력해 주세요.',
  });

  const {
    isValid: isNewPasswordValid,
    handleBlur: handleNewPasswordBlur,
    text: newPasswordValidText,
  } = useInputValidate({
    validation: (args) => PASSWORD_REGEX.test(args),
    successMsg: '안전한 비밀번호입니다!',
    errorMsg:
      '영문 대소문자, 특수문자(!, @, ?, -) 를 포함한 6글자 이상 사용하세요.',
  });

  const {
    isValid: isNewPasswordCheckValid,
    handleBlur: handleNewPasswordCheckBlur,
    text: newPasswordCheckValidText,
  } = useInputValidate({
    validation: (args1, args2) => args1 === args2,
    successMsg: '비밀번호가 일치합니다!',
    errorMsg: '비밀번호가 일치하지 않습니다.',
  });

  const isAllValid =
    isOldPasswordValid && isNewPasswordValid && isNewPasswordCheckValid;

  return (
    <>
      <Title contents="비밀번호 수정" />
      <Form onSubmit={onSubmit(isAllValid)}>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="기존 비밀번호를 입력하세요."
            onBlur={handleOldPasswordBlur()}
            name="oldPassword"
            type="password"
          />
          <ValidateText
            text={oldPasswordValidText}
            isValid={isOldPasswordValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            ref={newPwd}
            description="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력하세요."
            onBlur={handleNewPasswordBlur()}
            name="password"
            type="password"
          />
          <ValidateText
            text={newPasswordValidText}
            isValid={isNewPasswordValid}
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호를 확인하세요."
            onBlur={handleNewPasswordCheckBlur(newPwd.current?.value)}
            name="passwordCheck"
            type="password"
          />
          <ValidateText
            text={newPasswordCheckValidText}
            isValid={isNewPasswordCheckValid}
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
  const {
    isValid: isPasswordValid,
    handleBlur: handlePasswordBlur,
    text: passwordValidText,
  } = useInputValidate({
    validation: (args) => args.trim().length > 0,
    successMsg: '',
    errorMsg: '비밀번호를 입력해 주세요.',
  });
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
            type="password"
          />
          <ValidateText text={passwordValidText} isValid={isPasswordValid} />
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
