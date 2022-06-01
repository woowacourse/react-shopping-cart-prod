import CheckBox from 'components/@shared/CheckBox';
import Link from 'components/@shared/Link';
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
          <ZzangguLogo width={200} height={200} />
        </header>
        <StyledForm>
          <label>아이디</label>
          <input type="text" placeholder="아이디를 입력해주세요" />
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <StyledLoginHelper>
            <StyledKeepLogin>
              <CheckBox
                id="keep-login"
                checked={checked}
                onChange={toggleChecked}
                marginBottom="0px"
              />
              <label>로그인 상태 유지</label>
            </StyledKeepLogin>
            <StyledFindLoginInfo>
              <Link to="#">아이디 찾기</Link>
              <Link to="#">비밀번호 찾기</Link>
            </StyledFindLoginInfo>
          </StyledLoginHelper>
          <StyledLoginButton type="submit">로그인</StyledLoginButton>
        </StyledForm>
        <StyledSignupLinkGuide>
          아직 회원이 아니신가요? <Link to="#">회원가입</Link>
        </StyledSignupLinkGuide>
      </StyledLoginContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  width: 480px;
  height: 600px;

  background: ${({ theme: { colors } }) => colors.white};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  padding: 50px;
`;

const StyledTitle = styled.h1`
  text-align: center;

  color: ${({ theme: { colors } }) => colors.pink};

  font-weight: 900;
  font-size: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
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
  background: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 32px;

  font-size: 14px;
  font-weight: 900;
`;

const StyledSignupLinkGuide = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  width: 100%;
  margin-top: 10px;

  font-size: 14px;

  a {
    color: ${({ theme: { colors } }) => colors.pink};

    :hover {
      font-weight: 900;
    }
  }
`;

export default LoginPage;
