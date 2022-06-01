import React from "react";

import StyledSigninContainer from "@/pages/sign-in/Signin.style";

import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <StyledSigninContainer>
      <h2>로그인</h2>
      <Form buttonText="로그인">
        <Input placeholder="이메일"></Input>
        <Input type="password" placeholder="비밀번호"></Input>
      </Form>
      <div className="please-signup">
        아직 회원이 아니신가요?
        <Link to="/register">회원가입</Link>
      </div>
    </StyledSigninContainer>
  );
}

export default Signin;
