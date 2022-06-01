import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import styled from 'styled-components';

function SignupPage() {
  return (
    <StyledPage>
      <StyledSignupContainer>
        <header>
          <StyledTitle>회원가입</StyledTitle>
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
          <label htmlFor="passwordCheck">비밀번호 재확인</label>
          <input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
          />
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" placeholder="이메일을 입력해주세요" />
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="address"
            placeholder="주소를 입력해주세요"
          />
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="핸드폰 번호를 입력해주세요"
          />
          <StyledSignupButton type="submit">회원가입</StyledSignupButton>
        </StyledForm>
      </StyledSignupContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignupContainer = styled.div`
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
    margin-top: 4px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledSignupButton = styled.button`
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 40px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

export default SignupPage;
