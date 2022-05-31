import { theme } from "style";

import RegisterForm from "./RegisterForm";
import UserInput from "components/common/UserInput";
import DefaultButton from "components/common/Button/DefaultButton";
import PageHeader from "components/common/PageHeader";
import {
  RegisterPageContainer,
  RegisterInputContainer,
  RegisterButtonContainer,
  RegisterLabel,
} from "./styled";

function RegisterPage() {
  return (
    <RegisterPageContainer>
      <PageHeader>회원가입</PageHeader>
      <RegisterForm>
        <RegisterInputContainer>
          <RegisterLabel>이메일</RegisterLabel>
          <UserInput
            width="500px"
            errorMessage="gelllow~~"
            placeholder="이메일을 입력해주세요"
          />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>닉네임</RegisterLabel>
          <UserInput width="500px" placeholder="닉네임을 입력해주세요" />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>비밀번호</RegisterLabel>
          <UserInput width="500px" placeholder="비밀번호를 입력해주세요" />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>비밀번호 확인</RegisterLabel>
          <UserInput
            width="500px"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
        </RegisterInputContainer>
        <RegisterButtonContainer>
          <DefaultButton width="500px">가입하기</DefaultButton>
          <DefaultButton
            width="500px"
            bgColor={theme.color.main}
            textColor={theme.color.point}
          >
            로그인
          </DefaultButton>
        </RegisterButtonContainer>
      </RegisterForm>
    </RegisterPageContainer>
  );
}

export default RegisterPage;
