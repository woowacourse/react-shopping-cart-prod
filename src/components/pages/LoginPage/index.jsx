import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { theme } from "style";

import { ROUTES, RANGE } from "constants";

import { useStore } from "hooks/useStore";
import { login, USER_ACTION } from "reducers/user";

import PageHeader from "components/common/PageHeader";
import UserInput from "components/common/UserInput";
import UserForm from "components/common/UserForm";
import Spinner from "components/common/Spinner";
import DefaultButton from "components/common/Button/DefaultButton";
import { LoginPageContainer, LoginButtonContainer } from "./styled";
import ErrorPage from "../ErrorPage";

function LoginPage({ serverUrlIndex }) {
  const { isLoading, errorMessage, dispatch } = useStore("user");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const requestLogin = (e) => {
    e.preventDefault();
    dispatch(
      login(emailRef.current.value, passwordRef.current.value, serverUrlIndex)
    );
  };

  useEffect(() => {
    return () => {
      dispatch({ type: USER_ACTION.CLEAN_ERROR });
    };
  }, []);

  return (
    <LoginPageContainer>
      <PageHeader>로그인</PageHeader>
      {isLoading && <Spinner />}
      {errorMessage && <ErrorPage>{errorMessage}</ErrorPage>}
      <UserForm onSubmit={requestLogin}>
        <UserInput
          width="500px"
          placeholder="이메일을 입력해주세요"
          type="email"
          ref={emailRef}
          required
          autoFocus
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
