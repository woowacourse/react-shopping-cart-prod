import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const LogInPage = () => {
  return (
    <StyledRoot>
      <StyledTitle>로그인</StyledTitle>
      <StyledLabel>
        이메일
        <StyledInput />
      </StyledLabel>

      <StyledLabel>
        비밀번호
        <StyledInput />
      </StyledLabel>

      <StyledLoginButton>로그인</StyledLoginButton>

      <StyledFooter>회원가입</StyledFooter>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 50px;
  height: 700px;
  border: 1px solid black;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 34px;
  line-height: 36px;

  text-align: center;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;

  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;

  gap: 10px;
`;

const StyledLoginButton = styled.button`
  width: 80%;
  height: 65px;
  background-color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  font-size: 20px;
  padding-left: 10px;
`;

const StyledFooter = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export default LogInPage;
