import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Form from "@/components/common/form/Form";
import Field from "@/components/common/field/Field";

import {
  BASE_URL,
  MESSAGE,
  STATUS,
  ERROR_STATUS,
  NICKNAME,
  PASSWORD,
  REGULAR_EXPRESSION,
} from "@/constants";

import StyledSignupContainer from "@/components/pages/sign-up/Signup.style";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState({ value: "", status: STATUS.READY });
  const [nickname, setNickname] = useState({ value: "", status: STATUS.READY });
  const [password, setPassword] = useState({ value: "", status: STATUS.READY });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: STATUS.READY,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const validateEmail = (e) => {
    const { value } = e.target;
    setEmail((prev) => ({ ...prev, value: value }));

    if (!value.match(REGULAR_EXPRESSION.EMAIL)) {
      setEmail((prev) => ({ ...prev, status: ERROR_STATUS.EMAIL_RULE }));
      return;
    }

    setEmail((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

  const validateNickname = (e) => {
    const { value } = e.target;
    setNickname((prev) => ({ ...prev, value: value }));

    if (!value.match(REGULAR_EXPRESSION.NICKNAME)) {
      setNickname((prev) => ({ ...prev, status: ERROR_STATUS.WRONG_LENGTH }));
      return;
    }

    setNickname((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

  const validatePassword = (e) => {
    const { value } = e.target;
    setPassword((prev) => ({ ...prev, value: value }));

    if (!value.match(REGULAR_EXPRESSION.PASSWORD)) {
      setPassword((prev) => ({ ...prev, status: ERROR_STATUS.PASSWORD_RULE }));
      return;
    }

    setPassword((prev) => ({ ...prev, status: STATUS.FULFILLED }));
  };

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
      navigate("/login");
    } catch (error) {
      const { errorCode } = error.response.data;

      if (errorCode === "1001") {
        dispatch(toggleSnackbarOpen(MESSAGE.EXIST_EMAIL));
        return;
      }
      if (errorCode === "1000") {
        dispatch(toggleSnackbarOpen(MESSAGE.INVALID_SIGNUP_INPUT));
        return;
      }
      dispatch(toggleSnackbarOpen(error));
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
          onChange={validateEmail}
          errorMessage={email.status}
          required
        />
        <Field
          labelName="닉네임"
          placeholder="2~8글자 사이의 이름을 입력해주세요"
          minLength={NICKNAME.MIN_LENGTH}
          maxLength={NICKNAME.MAX_LENGTH}
          value={nickname.value}
          onChange={validateNickname}
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
          onChange={validatePassword}
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
