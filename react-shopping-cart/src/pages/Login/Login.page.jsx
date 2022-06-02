import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AuthContainer from 'components/@shared/AuthContainer/AuthContainer.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Input from 'components/@shared/Input/Input.component';
import Logo from 'components/@shared/Logo/Logo.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { loginUser } from 'redux/actions/auth.action';

import useFetch from 'hooks/useFetch';

const CopyrightBox = styled(FlexBox).attrs({
  justifyContent: 'center',
})`
  margin: 30px 0;
`;

const SignupLink = styled(Link)`
  color: ${({ theme }) => theme.colors['GRAY_002']};
  font-size: 14px;
  margin: 12px 0;
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    fetchData: login,
    data,
    error,
  } = useFetch({
    url: '/customers/login',
    method: 'post',
    skip: true,
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const accessToken = data?.accessToken && data.accessToken;

  const handleLogin = async e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await login({ email, password });
  };

  const { accessToken: isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(loginUser(data));
      navigate('/');
    }
  }, [accessToken]);

  return (
    <AuthContainer>
      <FlexBox height="100%" direction="column" justifyContent="flex-end" gap="25px">
        <Link to="/">
          <Logo color="MINT_001" />
        </Link>
        <FlexBox
          as="form"
          onSubmit={handleLogin}
          width="100%"
          direction="column"
          gap="20px"
          alignItems="flex-end"
        >
          <Input ref={emailRef} type="email" placeholder="이메일" />
          <Input ref={passwordRef} type="password" placeholder="비밀번호" />
          {error && error}
          <SignupLink to="/signup">회원가입</SignupLink>
          <Button width="100%" borderRadius="10px" onClick={handleLogin}>
            <TextBox color="WHITE_001">로그인</TextBox>
          </Button>
        </FlexBox>
        <CopyrightBox>
          <TextBox fontSize="extraSmall">©️ WOOWA Shop Corp.</TextBox>
        </CopyrightBox>
      </FlexBox>
    </AuthContainer>
  );
}

export default Login;
