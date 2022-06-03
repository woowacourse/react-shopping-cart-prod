import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

import axios from 'axios';

import useInput from '../../hooks/useInput';
import usePassword from '../../hooks/usePassword';

import { DuplicateCheckButton, IdContainer } from './styles';

import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

function Signup() {
  const [id, onChangeId] = useInput();
  const [idStatus, setIdStatus] = useState({
    isValid: false,
    message: '',
  });
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
    const response = await axios.post('/api/customers/duplication', { userName: id });

    if (!response.data) {
      setIdStatus({ isValid: true, message: '사용 가능한 아이디입니다.' });

      return;
    }

    setIdStatus({
      isValid: false,
      message: '이미 가입된 아이디입니다. 다른 아이디를 입력하여 주세요.',
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idStatus.isValid) {
      alert('아이디 중복이 확인되지 않았습니다!');

      return;
    }

    await axios.post('/api/customers', { userName: id, password });

    navigate(routes.login);
  };

  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <IdContainer>
          <Input
            htmlFor="signup-id"
            label="아이디"
            value={id}
            onChange={onChangeId}
            maxLength={10}
            isValid={idStatus.isValid}
            message={idStatus.message}
          />
          {id && (
            <DuplicateCheckButton type="button" onClick={onClickDuplicateCheck}>
              중복 확인
            </DuplicateCheckButton>
          )}
        </IdContainer>
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
