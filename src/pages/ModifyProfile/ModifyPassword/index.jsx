import { useEffect, useRef } from 'react';
import * as Styled from './style';
import useInputValidate from 'hooks/useInputValidate';
import useModifyPassword from './hook';
import useSnackBar from 'hooks/useSnackBar';

import Title from 'components/Common/Title/Title';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import Input from 'components/Common/Input/Input';
import ValidateText from 'components/Common/ValidateText/ValidateText';
import Button from 'components/Common/Button/Button';
import PropTypes from 'prop-types';

const ModifyPassword = ({ closeModal }) => {
  const { modifyPassword, isSucceed, isError } = useModifyPassword();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
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

  const handleModifyPassword = (e) => {
    e.preventDefault();
    if (!isAllValid) return;
    const {
      oldPassword: { value: oldPassword },
      password: { value: password },
    } = e.target.elements;
    modifyPassword(oldPassword, password);
  };

  useEffect(() => {
    if (isSucceed) {
      showSuccessSnackBar('비밀번호가 성공적으로 변경되었습니다!');
      closeModal();
      return;
    }
    if (isError) {
      showErrorSnackBar('에러');
    }
  }, [isSucceed, isError]);

  return (
    <>
      <Title contents="비밀번호 수정" />
      <Styled.Form onSubmit={handleModifyPassword}>
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
      </Styled.Form>
    </>
  );
};

ModifyPassword.propTypes = {
  closeModal: PropTypes.func,
};

export default ModifyPassword;
