import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "@/constants";
import StyledSignupContainer from "@/pages/sign-up/Signup.style";

import Form from "@/components/form/Form";
import Field from "@/components/field/Field";

function Signup() {
  const [email, setEmail] = useState({ value: "", status: "ready" });
  const [nickname, setNickname] = useState({ value: "", status: "ready" });
  const [password, setPassword] = useState({ value: "", status: "ready" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: "ready",
  });

  const [preventFormSubmit, setPreventFormSubmit] = useState(true);

  useEffect(() => {
    if (
      email.status === "fulfilled" &&
      nickname.status === "fulfilled" &&
      password.status === "fulfilled" &&
      passwordConfirm.status === "fulfilled"
    ) {
      setPreventFormSubmit(false);
      return;
    }
    setPreventFormSubmit(true);
  }, [email, nickname, password, passwordConfirm]);

  const validateEmail = (e) => {
    const { value } = e.target;
    setEmail((prev) => ({ ...prev, value: value }));
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!value.match(regex)) {
      setEmail((prev) => ({ ...prev, status: "이메일형식아님" }));
      return;
    }

    setEmail((prev) => ({ ...prev, status: "fulfilled" }));
  };

  const validateNickname = (e) => {
    const { value } = e.target;
    setNickname((prev) => ({ ...prev, value: value }));
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/;

    if (!value.match(regex)) {
      setNickname((prev) => ({ ...prev, status: "잘못된길이" }));
      return;
    }

    setNickname((prev) => ({ ...prev, status: "fulfilled" }));
  };

  const validatePassword = (e) => {
    const { value } = e.target;
    setPassword((prev) => ({ ...prev, value: value }));
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (!value.match(regex)) {
      setPassword((prev) => ({ ...prev, status: "비밀번호규칙" }));
      return;
    }

    setPassword((prev) => ({ ...prev, status: "fulfilled" }));
  };

  const validatePasswordConfirm = (e) => {
    const { value } = e.target;
    setPasswordConfirm((prev) => ({ ...prev, value: value }));

    if (value !== password.value) {
      setPasswordConfirm((prev) => ({
        ...prev,
        status: "불일치",
      }));
      return;
    }

    setPasswordConfirm((prev) => ({ ...prev, status: "fulfilled" }));
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
      if (error.response.data.errorCode === "1000") {
        alert("회원 정보 양식이 잘못되었습니다.");
      }
      if (error.response.data.errorCode === "1001") {
        alert("이미 존재하는 이메일입니다.");
      }
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
          minLength={2}
          maxLength={8}
          value={nickname.value}
          onChange={validateNickname}
          errorMessage={nickname.status}
          required
        />
        <Field
          labelName="비밀번호"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
          minLength={8}
          maxLength={20}
          value={password.value}
          onChange={validatePassword}
          errorMessage={password.status}
          required
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
          minLength={8}
          maxLength={20}
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
