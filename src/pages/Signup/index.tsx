import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import useInput from '@/hooks/useInput';
import usePassword from '@/hooks/usePassword';

import { DuplicateCheckButton, UserNameContainer } from './styles';

import { Button, Form, Input } from '@/components/@shared';
import PageLayout from '@/components/PageLayout';

import axios from 'axios';
import { checkUserNameDuplicateAPI } from '@/apis/user';
import { validateUserName } from '@/validations';
import { ERROR_MESSAGES, INFO_MESSAGES } from '@/constants';

function Signup() {
  const [userName, onChangeUserName, userNameErrorMessage] = useInput(validateUserName);
  const [canSubmit, setCanSubmit] = useState(false);
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();
  const navigate = useNavigate();

  const onClickDuplicateCheck = async () => {
    if (userNameErrorMessage) {
      alert(ERROR_MESSAGES.SIGNUP.USER_NAME_RULE);

      return;
    }

    const isDuplicate = await checkUserNameDuplicateAPI(userName);

    if (isDuplicate === undefined) return;

    setCanSubmit(true);

    if (isDuplicate === false) {
      alert(INFO_MESSAGES.VALID_USER_NAME);

      return;
    }

    alert(ERROR_MESSAGES.SIGNUP.EXIST_USER_NAME);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      alert(ERROR_MESSAGES.SIGNUP.NOT_USER_NAME_DUPLICATE_CHECK);

      return;
    }

    const result = await signupAPI(userName, password);

    if (!result) return;

    navigate(routes.login);
  };

  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <UserNameContainer>
          <Input
            htmlFor="signup-user-name"
            label="아이디"
            value={userName}
            onChange={onChangeUserName}
            maxLength={10}
            isValid={!userNameErrorMessage}
            message={userName && userNameErrorMessage}
          />
          {userName && (
            <DuplicateCheckButton type="button" onClick={onClickDuplicateCheck}>
              중복 확인
            </DuplicateCheckButton>
          )}
        </UserNameContainer>
        <Input
          type="password"
          htmlFor="signup-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          maxLength={20}
          isValid={!passwordErrorMessage}
          message={password && passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="signup-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          maxLength={20}
          isValid={!passwordConfirmErrorMessage}
          message={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
    </PageLayout>
  );
}

export default Signup;
