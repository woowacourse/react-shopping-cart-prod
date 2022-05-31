import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const onSubmitAuthForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  console.log('123');

  return (
    <AuthPage
      title='로그인'
      onSubmitAuthForm={onSubmitAuthForm}
      bottom={
        <StyledBottom>
          아직 회원이 아니신가요? <StyledLink to='/signup'>회원가입</StyledLink>
        </StyledBottom>
      }
    >
      <LabeledInput
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일 주소를 입력해주세요'
      />
      <LabeledInput
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
      />
    </AuthPage>
  );
};

export default Login;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.BLUE_38d};
  margin-left: 10px;
`;

const StyledBottom = styled.p`
  font-size: 15px;
  margin-top: 15px;
`;
