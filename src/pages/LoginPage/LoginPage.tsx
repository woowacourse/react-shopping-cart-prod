import { useEffect } from 'react';

import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import { Link } from 'components/@shared';
import LoginForm from 'components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './LoginPage.styled';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      alert(USER_MESSAGE.ALREADY_LOGGED_IN);

      navigate(PATH.BASE);
    }
  }, [navigate]);

  return (
    <S.Page>
      <S.LoginContainer>
        <header>
          <S.Title>로그인</S.Title>
          <ZzangguLogo width={200} height={180} />
        </header>
        <LoginForm />
        <S.SignupLinkGuide>
          아직 회원이 아니신가요? <Link to={PATH.SIGNUP}>회원가입</Link>
        </S.SignupLinkGuide>
      </S.LoginContainer>
    </S.Page>
  );
}

export default LoginPage;
