import Form from 'components/Common/Form/Form';
import Fieldset from 'components/Common/Fieldset/Fieldset';
import Input from 'components/Common/Input/Input';
import Button from 'components/Common/Button/Button';
import useLoginPage from './hooks';
import * as Styled from './style';

const Login = () => {
  const { handleLogin } = useLoginPage();
  return (
    <Styled.Wrapper>
      <Form title="로그인" onSubmit={handleLogin}>
        <Fieldset>
          <Input
            description="이메일"
            placeholder="example@example.com"
            type="email"
            name="email"
          />
        </Fieldset>
        <Fieldset>
          <Input
            description="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
          />
        </Fieldset>
        <Button colorType="primary" type="submit">
          로그인
        </Button>
      </Form>
    </Styled.Wrapper>
  );
};

export default Login;
