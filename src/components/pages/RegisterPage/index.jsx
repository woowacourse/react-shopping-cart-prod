import { theme } from "style";

import { RANGE } from "constants";

import { useInputHandler } from "hooks/useInputHandler";
import { registerValidator } from "validator";

import UserInput from "components/common/UserInput";
import DefaultButton from "components/common/Button/DefaultButton";
import PageHeader from "components/common/PageHeader";
import {
  RegisterPageContainer,
  RegisterInputContainer,
  RegisterButtonContainer,
  RegisterLabel,
} from "./styled";
import UserForm from "components/common/UserForm";

const initialUserInfo = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

function RegisterPage() {
  const {
    inputValue: userInfo,
    updateInputState: handleChangeInput,
    errorMessage,
    setErrorMessage,
  } = useInputHandler(registerValidator, initialUserInfo);

  const comparePassword = ({ target: { value } }) => {
    if (userInfo.password !== value) {
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다",
      }));
    }
  };

  const handlePasswordConfirmChange = (e) => {
    handleChangeInput(e);
    comparePassword(e);
  };

  const isErrorExist = () => {
    return Object.values(errorMessage).some((error) => error);
  };

  const registerUserInfo = (e) => {
    e.preventDefault();

    if (isErrorExist())
      alert("유효하지 않은 입력이 있습니다. 수정하고 가입해주세요");
    /* TODO: API 요청 후 성공하면 로그인페이지로 리디렉트 */
  };

  return (
    <RegisterPageContainer>
      <PageHeader>회원가입</PageHeader>
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
            autocomplete
            required
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
            autocomplete
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
          <DefaultButton
            type="button"
            width="500px"
            bgColor={theme.color.main}
            textColor={theme.color.point}
          >
            로그인
          </DefaultButton>
        </RegisterButtonContainer>
      </UserForm>
    </RegisterPageContainer>
  );
}

export default RegisterPage;
