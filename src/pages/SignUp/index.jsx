import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Field from "@/components/Field";
import Form from "@/components/Form";
import { INPUT_TYPE, NICKNAME, PASSWORD, PATH, STATUS } from "@/constants";
import useFetch from "@/hooks/useFetch";
import useInput from "@/hooks/useInput";
import usePasswordConfirm from "@/hooks/usePasswordConfirm";
import StyledSignupContainer from "@/pages/SignUp/index.style";

function Signup() {
  const [email, onChangeEmail] = useInput(INPUT_TYPE.EMAIL, STATUS.READY);
  const [nickname, onChangeNickname] = useInput(
    INPUT_TYPE.NICKNAME,
    STATUS.READY
  );
  const [password, onChangesetPassword] = useInput(
    INPUT_TYPE.PASSWORD,
    STATUS.READY
  );
  const [passwordConfirm, onChangePasswordConfirm] = usePasswordConfirm();
  const [preventFormSubmit, setPreventFormSubmit] = useState(true);
  const { error, success, getData: registerUser } = useFetch("post", "users");
  const { authorized } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate(PATH.HOME);
    }
  }, [authorized]);

  useEffect(() => {
    if (
      email.status === STATUS.FULFILLED &&
      nickname.status === STATUS.FULFILLED &&
      password.status === STATUS.FULFILLED &&
      passwordConfirm.status === STATUS.FULFILLED
    ) {
      setPreventFormSubmit(false);
      return;
    }
    setPreventFormSubmit(true);
  }, [email, nickname, password, passwordConfirm]);

  useEffect(() => {
    if (success && !error) {
      navigate(PATH.LOGIN);
    }
  }, [success]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    registerUser({
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    });
  };

  return (
    <StyledSignupContainer>
      <h2>회원가입</h2>
      <Form
        buttonText="회원가입"
        onSubmit={handleSignupSubmit}
        preventFormSubmit={preventFormSubmit}
      >
        <Field
          labelName="이메일"
          type="email"
          placeholder="woowa@gmail.com"
          value={email.value}
          onChange={onChangeEmail}
          errorMessage={email.status}
          required
        />
        <Field
          labelName="닉네임"
          placeholder="2~8글자 사이의 이름을 입력해주세요"
          minLength={NICKNAME.MIN_LENGTH}
          maxLength={NICKNAME.MAX_LENGTH}
          value={nickname.value}
          onChange={onChangeNickname}
          errorMessage={nickname.status}
          required
        />
        <Field
          labelName="비밀번호"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          value={password.value}
          onChange={onChangesetPassword}
          errorMessage={password.status}
          required
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          value={passwordConfirm.value}
          onChange={(e) => onChangePasswordConfirm(e, password.value)}
          errorMessage={passwordConfirm.status}
          required
        />
      </Form>
    </StyledSignupContainer>
  );
}

export default Signup;
