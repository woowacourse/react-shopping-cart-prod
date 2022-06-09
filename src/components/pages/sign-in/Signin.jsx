import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Form from "@/components/common/form/Form";
import Input from "@/components/common/input/Input";

import { setCookie, getCookie } from "@/utils/cookie";
import { PATH, MESSAGE } from "@/constants";

import StyledSigninContainer from "@/components/pages/sign-in/Signin.styled";

function Signin() {
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(toggleSnackbarOpen(MESSAGE.NOT_AUTHORIZED));
      navigate(PATH.MAIN);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/login`, {
        email: email.current.value,
        password: password.current.value,
      });
      setCookie("accessToken", data.accessToken);
      navigate(PATH.MAIN);
      location.reload();
    } catch (error) {
      if (error.response?.status === 400) {
        dispatch(toggleSnackbarOpen(MESSAGE.CHECK_EMAIL_OR_PASSWORD));
        return;
      }
      if (error.response?.status === 500) {
        dispatch(toggleSnackbarOpen(MESSAGE.SERVER_REQUEST_FAIL));
        return;
      }
      dispatch(toggleSnackbarOpen(error));
    }
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
