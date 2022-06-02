import axios from 'axios';

import useInput from '../../hooks/useInput';
import usePassword from '../../hooks/usePassword';

import { Button, Form, Input } from '../../components/@shared';
import PageLayout from '../../components/PageLayout';

function Signup() {
  const [id, onChangeId] = useInput();
  const {
    password,
    onChangePassword,
    passwordErrorMessage,
    passwordConfirm,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  } = usePassword();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('/api/customers', { userName: id, password });
  };

  return (
    <PageLayout>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="signup-id" label="아이디" value={id} onChange={onChangeId} />
        <Button type="button">중복 확인</Button>
        <Input
          type="password"
          htmlFor="signup-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          errorMessage={passwordErrorMessage}
        />
        <Input
          type="password"
          htmlFor="signup-password-confirm"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          errorMessage={passwordConfirmErrorMessage}
        />
        <Button>확인</Button>
      </Form>
    </PageLayout>
  );
}

export default Signup;
