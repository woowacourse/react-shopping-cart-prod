import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { theme } from "style";

import { RANGE, ROUTES, BASE_SERVER_URL, SERVER_PATH } from "constants";

import { useInputHandler } from "hooks/useInputHandler";
import { registerValidator } from "validator";
import { registerBaseServer } from "util/fetch";
import { USER_ACTION } from "reducers/user";

import UserInput from "components/common/UserInput";
import DefaultButton from "components/common/Button/DefaultButton";
import PageHeader from "components/common/PageHeader";
import UserForm from "components/common/UserForm";
import Spinner from "components/common/Spinner";
import {
  RegisterPageContainer,
  RegisterInputContainer,
  RegisterButtonContainer,
  RegisterLabel,
} from "./styled";

const initialUserInfo = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

function RegisterPage() {
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    inputValue: userInfo,
    updateInputState: handleChangeInput,
    errorMessage,
    setErrorMessage,
  } = useInputHandler(registerValidator, initialUserInfo);

  const registerUserInfo = (e) => {
    e.preventDefault();

    if (isErrorExist()) {
      alert("유효하지 않은 입력이 있습니다. 수정하고 가입해주세요");
      return;
    }
    requestRegister();
  };

  const isErrorExist = () => {
    return Object.values(errorMessage).some((error) => error);
  };

  const requestRegister = async () => {
    try {
      setIsLoading(true);
      const response = await registerBaseServer({
        url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}`,
        body: JSON.stringify({
          email: userInfo.email,
          username: userInfo.nickname,
          password: userInfo.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          setErrorMessage((prev) => ({
            ...prev,
            [data.field]: data.message,
          }));
          throw Error(data.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      return;
    }
    alert("회원가입에 성공했습니다 :D");
    navigator(ROUTES.LOGIN);
    setIsLoading(false);
  };

  const handlePasswordConfirmChange = (e) => {
    handleChangeInput(e);
    comparePassword(e);
  };

  const comparePassword = ({ target: { value } }) => {
    if (userInfo.password !== value) {
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다",
      }));
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigator(ROUTES.LOGIN);
    }
    return () => {
      dispatch({ type: USER_ACTION.CLEAN_ERROR });
    };
  }, []);

  return (
    <RegisterPageContainer>
      <PageHeader>회원가입</PageHeader>
      {isLoading && <Spinner />}
      <UserForm onSubmit={registerUserInfo}>
        <RegisterInputContainer>
          <RegisterLabel>이메일</RegisterLabel>
          <UserInput
            type="email"
            minLength={RANGE.EMAIL_MIN_LENGTH}
            maxLength={RANGE.EMAIL_MAX_LENGTH}
            width="500px"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={userInfo.email}
            onChange={handleChangeInput}
            required
            autoFocus
            errorMessage={errorMessage.email}
          />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>닉네임</RegisterLabel>
          <UserInput
            type="text"
            minLength={RANGE.NICKNAME_MIN_LENGTH}
            maxLength={RANGE.NICKNAME_MAX_LENGTH}
            width="500px"
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={userInfo.nickname}
            onChange={handleChangeInput}
            required
            errorMessage={errorMessage.nickname}
          />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>비밀번호</RegisterLabel>
          <UserInput
            type="password"
            minLength={RANGE.PW_MIN_LENGTH}
            maxLength={RANGE.PW_MAX_LENGTH}
            width="500px"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={userInfo.password}
            required
            onChange={handleChangeInput}
            errorMessage={errorMessage.password}
          />
        </RegisterInputContainer>
        <RegisterInputContainer>
          <RegisterLabel>비밀번호 확인</RegisterLabel>
          <UserInput
            type="password"
            minLength={RANGE.PW_MIN_LENGTH}
            maxLength={RANGE.PW_MAX_LENGTH}
            width="500px"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            name="passwordConfirm"
            value={userInfo.passwordConfirm}
            required
            onChange={handlePasswordConfirmChange}
            errorMessage={errorMessage.passwordConfirm}
          />
        </RegisterInputContainer>
        <RegisterButtonContainer>
          <DefaultButton type="submit" width="500px">
            가입하기
          </DefaultButton>
          <Link to={ROUTES.LOGIN}>
            <DefaultButton
              type="button"
              width="500px"
              bgColor={theme.color.main}
              textColor={theme.color.point}
            >
              로그인
            </DefaultButton>
          </Link>
        </RegisterButtonContainer>
      </UserForm>
    </RegisterPageContainer>
  );
}

export default RegisterPage;
