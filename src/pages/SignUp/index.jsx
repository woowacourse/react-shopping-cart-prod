import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import useInput from "@/hooks/useInput";

import Form from "@/components/Form";
import Field from "@/components/Field";

import {
  BASE_URL,
  MESSAGE,
  INPUT_TYPE,
  STATUS,
  ERROR_STATUS,
  NICKNAME,
  PASSWORD,
} from "@/constants";

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
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: STATUS.READY,
  });

  const dispatch = useDispatch();

  const [preventFormSubmit, setPreventFormSubmit] = useState(true);

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

  const validatePasswordConfirm = (e) => {
    const { value } = e.target;
    setPasswordConfirm((prev) => ({ ...prev, value: value }));

    if (value !== password.value) {
      setPasswordConfirm((prev) => ({
        ...prev,
        status: ERROR_STATUS.MISMATCH,
      }));
      return;
    }

    setPasswordConfirm((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/users`, {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      });
    } catch (error) {
      const { errorCode } = error.response.data;
      if (errorCode === "1000") {
        dispatch(toggleSnackbarOpen(MESSAGE.INVALID_SIGNUP_INPUT));
      }
      if (errorCode === "1001") {
        dispatch(toggleSnackbarOpen(MESSAGE.EXIST_EMAIL));
      }
      console.log(error);
    }
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
          onChange={validatePasswordConfirm}
          errorMessage={passwordConfirm.status}
          required
        />
      </Form>
    </StyledSignupContainer>
  );
}

export default Signup;
