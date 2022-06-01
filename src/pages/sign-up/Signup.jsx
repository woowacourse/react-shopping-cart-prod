import React from "react";

import StyledSignupContainer from "@/pages/sign-up/Signup.style";

import Form from "@/components/form/Form";
import Field from "@/components/field/Field";

function Signup() {
  return (
    <StyledSignupContainer>
      <h2>회원가입</h2>
      <Form buttonText="회원가입">
        <Field labelName="이메일" placeholder="woowa@gmail.com"></Field>
        <Field
          labelName="닉네임"
          placeholder="2~8글자 사이의 이름을 입력해주세요"
        ></Field>
        <Field
          labelName="비밀번호"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
        ></Field>
        <Field
          labelName="비밀번호 확인"
          type="password"
          placeholder="8자 이상(영문, 숫자 2개 조합으로) 20자 이하"
        ></Field>
      </Form>
    </StyledSignupContainer>
  );
}

export default Signup;
