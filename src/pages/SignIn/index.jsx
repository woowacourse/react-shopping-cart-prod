import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";
import { getUser } from "@/redux/modules/user";

import Form from "@/components/Form";
import Input from "@/components/Input";

import { PATH } from "@/constants";

import StyledSigninContainer from "@/pages/SignIn/index.style";

function Signin() {
  const email = useRef(null);
  const password = useRef(null);

  const { authorized } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate(PATH.MAIN);
    }
  }, [authorized]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUser(email.current.value, password.current.value));
  };

  return (
    <StyledSigninContainer>
      <h2>로그인</h2>
      <Form buttonText="로그인" onSubmit={handleLoginSubmit}>
        <Input placeholder="이메일" ref={email} />
        <Input type="password" placeholder="비밀번호" ref={password} />
      </Form>
      <div className="please-signup">
        아직 회원이 아니신가요?
        <Link to="/register">회원가입</Link>
      </div>
    </StyledSigninContainer>
  );
}

export default Signin;
