import { theme } from "style";

import PageHeader from "components/common/PageHeader";
import UserInput from "components/common/UserInput";
import DefaultButton from "components/common/Button/DefaultButton";
import UserForm from "components/common/UserForm";
import { LoginPageContainer, LoginButtonContainer } from "./styled";

function LoginPage() {
  return (
    <LoginPageContainer>
      <PageHeader>로그인</PageHeader>
      <UserForm>
        <UserInput width="500px" placeholder="이메일을 입력해주세요" />
        <UserInput width="500px" placeholder="비밀번호를 입력해주세요" />
        <LoginButtonContainer>
          <DefaultButton width="500px">로그인</DefaultButton>
          <DefaultButton
            width="500px"
            bgColor={theme.color.main}
            textColor={theme.color.point}
          >
            회원가입
          </DefaultButton>
        </LoginButtonContainer>
      </UserForm>
    </LoginPageContainer>
  );
}

export default LoginPage;
