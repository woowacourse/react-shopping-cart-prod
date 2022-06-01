import { useRef } from "react";
import { Link } from "react-router-dom";

import { theme } from "style";

import { ROUTES, RANGE } from "constants";

import PageHeader from "components/common/PageHeader";
import UserInput from "components/common/UserInput";
import DefaultButton from "components/common/Button/DefaultButton";
import UserForm from "components/common/UserForm";
import { LoginPageContainer, LoginButtonContainer } from "./styled";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = (e) => {
    e.preventDefault();
    // TODO: 서버로 요청 후 성공시 메인페이지로 리다이렉트
  };

  return (
    <LoginPageContainer>
      <PageHeader>로그인</PageHeader>
      <UserForm onSubmit={login}>
        <UserInput
          width="500px"
          placeholder="이메일을 입력해주세요"
          type="email"
          ref={emailRef}
          required
        />
        <UserInput
          width="500px"
          placeholder="비밀번호를 입력해주세요"
          ref={passwordRef}
          minLength={RANGE.PW_MIN_LENGTH}
          maxLength={RANGE.PW_MAX_LENGTH}
          type="password"
          required
        />
        <LoginButtonContainer>
          <DefaultButton width="500px" type="submit">
            로그인
          </DefaultButton>
          <Link to={ROUTES.REGISTER}>
            <DefaultButton
              type="button"
              width="500px"
              bgColor={theme.color.main}
              textColor={theme.color.point}
            >
              회원가입
            </DefaultButton>
          </Link>
        </LoginButtonContainer>
      </UserForm>
    </LoginPageContainer>
  );
}

export default LoginPage;
