import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import styled from 'styled-components';

function EditUserInfoPage() {
  return (
    <StyledPage>
      <StyledEditContainer>
        <header>
          <StyledTitle>회원 정보 수정</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <StyledForm>
          <label htmlFor="id">아이디</label>
          <input id="id" type="text" value="halee" disabled />
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" value="halee@naver.com" disabled />
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
          <StyledButtons>
            <StyledWithdrawButton type="submit">회원 탈퇴</StyledWithdrawButton>
            <StyledEditButton type="submit">회원 정보 수정</StyledEditButton>
          </StyledButtons>
        </StyledForm>
      </StyledEditContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEditContainer = styled.div`
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

const StyledButtons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const StyledWithdrawButton = styled.button`
  width: 50%;
  height: 40px;
  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.redPink};
  border: 1px solid ${({ theme: { colors } }) => colors.redPink};
  border-radius: 5px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

const StyledEditButton = styled.button`
  width: 50%;
  height: 40px;
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

export default EditUserInfoPage;
