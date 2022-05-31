import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

function SignUpPage() {
  return (
    <StyledSignUpContainer>
      <h1 style={{ marginBottom: '40px' }}>회원가입</h1>
      <StyledSignUpForm>
        <Input labelText="이메일" placeholder="이메일 주소를 입력해주세요" />
        <Input
          labelText="닉네임"
          minLength={1}
          maxLength={10}
          placeholder="닉네임을 입력해주세요"
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={8}
          maxLength={20}
          placeholder="비밀번호를 입력해주세요"
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={8}
          maxLength={20}
          placeholder="비밀번호를 입력해주세요"
        />
        <Button text="가입하기" />
      </StyledSignUpForm>
    </StyledSignUpContainer>
  );
}

const StyledSignUpContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledSignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default SignUpPage;
