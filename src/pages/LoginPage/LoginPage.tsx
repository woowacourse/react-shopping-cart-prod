import { useEffect } from 'react';

import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import Link from 'components/@shared/Link';
import LoginForm from 'components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      alert(USER_MESSAGE.ALREADY_LOGGED_IN);

      navigate(PATH.BASE);
    }
  }, [navigate]);

  return (
    <StyledPage>
      <StyledLoginContainer>
        <header>
          <StyledTitle>로그인</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <LoginForm />
        <StyledSignupLinkGuide>
          아직 회원이 아니신가요? <Link to={PATH.SIGNUP}>회원가입</Link>
        </StyledSignupLinkGuide>
      </StyledLoginContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  width: 480px;
  margin: 60px 0;

  background: ${({ theme: { colors } }) => colors.white};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  padding: 50px;
`;

const StyledTitle = styled.h1`
  text-align: center;

  color: ${({ theme: { colors } }) => colors.redPink};

  font-weight: 900;
  font-size: 24px;
`;

const StyledSignupLinkGuide = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  width: 100%;
  margin-top: 18px;

  font-size: 14px;

  a {
    color: ${({ theme: { colors } }) => colors.redPink};

    :hover {
      font-weight: 900;
    }
  }
`;

export default LoginPage;
