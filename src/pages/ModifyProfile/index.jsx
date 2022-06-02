import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Profile from 'components/User/Profile/Profile';
import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Form from 'components/Common/Form/Form';
import Input from 'components/Common/Input/Input';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import ValidateText from 'components/Common/ValidateText/ValidateText';

import { showSnackBar } from 'reducers/ui/ui.actions';
import useInputValidate from 'hooks/useInputValidate';
import { PATH_NAME } from 'constants';

import useModifyProfilePage from './hooks';
import PropTypes from 'prop-types';
import * as Styled from './style';

const ModifyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);
  const [openPasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);

  const {
    updatePassword,
    isUpdatePasswordSucceed,
    isUpdatePasswordError,
    unregister,
    isUnregisterSucceed,
    isUnregisterError,
  } = useModifyProfilePage();
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

  const handleSubmitWithdrawal = (e) => {
    e.preventDefault();

    const {
      password: { value: password },
    } = e.target.elements;

    unregister(password);
  };

  useEffect(() => {
    if (isUpdatePasswordSucceed) {
      setOpenChangePasswordModal(false);
      dispatch(
        showSnackBar({
          type: 'SUCCESS',
          text: '비밀번호가 성공적으로 변경되었습니다.',
        }),
      );
      return;
    }
    if (isUpdatePasswordError) {
      dispatch(
        showSnackBar({
          type: 'ERROR',
          text: '비밀번호를 올바르게 입력하세요.',
        }),
      );
      return;
    }
  }, [isUpdatePasswordSucceed, isUpdatePasswordError]);

  useEffect(() => {
    if (isUnregisterSucceed) {
      setOpenWithdrawalModal(false);
      navigate(PATH_NAME.HOME);
      return;
    }
    if (isUnregisterError) {
      dispatch(
        showSnackBar({
          type: 'ERROR',
          text: '비밀번호를 올바르게 입력하세요.',
        }),
      );
      return;
    }
  }, [isUnregisterSucceed, isUnregisterError]);

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
        isModalOpened={openPasswordModal}
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

  const isAllValid =
    oldPasswordValidate.isValid &&
    newPasswordValidate.isValid &&
    newPasswordCheckValidate.isValid;

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
            onBlur={handleNewPasswordCheckBlur(newPwd.current?.value)}
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
            type="password"
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
