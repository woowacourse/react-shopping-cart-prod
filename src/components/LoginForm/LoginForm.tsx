import Link from 'components/@shared/Link';
import styled from 'styled-components';
import LabeledInput from 'components/@shared/LabeledInput';
import useLoginForm from './useLoginForm';

function LoginForm() {
  const { handleSubmit } = useLoginForm();

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LabeledInput
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요"
        required
      >
        아이디
      </LabeledInput>
      <LabeledInput
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        required
      >
        비밀번호
      </LabeledInput>
      <StyledLoginHelper>
        <StyledFindLoginInfo>
          <Link to="#">아이디 찾기</Link>
          <Link to="#">비밀번호 찾기</Link>
        </StyledFindLoginInfo>
      </StyledLoginHelper>
      <StyledLoginButton type="submit">로그인</StyledLoginButton>
    </StyledForm>
  );
}

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
  justify-content: flex-end;
  margin-top: 4px;
  width: 100%;
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

export default LoginForm;
