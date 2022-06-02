import React, { useEffect, useRef } from "react";
import axios from "axios";

import StyledSigninContainer from "@/pages/sign-in/Signin.style";

import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCookie, getCookie } from "@/utils/auth";
import { BASE_URL } from "@/constants";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

function Signin() {
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(toggleSnackbarOpen("접근할 수 없는 페이지입니다"));
      navigate("/");
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email: email.current.value,
        password: password.current.value,
      });
      setCookie("accessToken", data.accessToken);
      navigate("/");
      location.reload();
    } catch (error) {
      const { errorCode } = error.response.data;
      if (errorCode === "1000" || errorCode === "1002") {
        dispatch(
          toggleSnackbarOpen("이메일 주소 혹은 비밀번호를 확인해주세요.")
        );
      }
      console.log(error);
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
