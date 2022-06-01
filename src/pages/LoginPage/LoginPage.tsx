import CheckBox from 'components/@shared/CheckBox';
import Link from 'components/@shared/Link';
import PATH from 'constants/path';
import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import styled from 'styled-components';
import { useState } from 'react';

function LoginPage() {
  const [checked, setChecked] = useState(false);

  const toggleChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    setChecked(prevState => !prevState);
  };

  return (
    <StyledPage>
      <StyledLoginContainer>
        <header>
          <StyledTitle>로그인</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <StyledForm>
          <label htmlFor="id">아이디</label>
          <input id="id" type="text" placeholder="아이디를 입력해주세요" />
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <StyledLoginHelper>
            <StyledKeepLogin>
              <CheckBox
                id="keep-login"
                checked={checked}
                onChange={toggleChecked}
                marginBottom="0px"
              />
              <label htmlFor="keep-login">로그인 상태 유지</label>
            </StyledKeepLogin>
            <StyledFindLoginInfo>
              <Link to="#">아이디 찾기</Link>
              <Link to="#">비밀번호 찾기</Link>
            </StyledFindLoginInfo>
          </StyledLoginHelper>
          <StyledLoginButton type="submit">로그인</StyledLoginButton>
        </StyledForm>
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 10px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledLoginHelper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  width: 100%;
`;

const StyledKeepLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  > label {
    font-size: 10px;
  }
`;

const StyledFindLoginInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme: { colors } }) => colors.gray};

  font-size: 10px;

  a:hover {
    font-weight: 900;
  }
`;

const StyledLoginButton = styled.button`
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 40px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
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
