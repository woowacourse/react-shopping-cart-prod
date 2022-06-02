import React, { useState, useEffect } from "react";

import StyledUserEditContainer from "@/pages/user-edit/UserEdit.style";

import Form from "@/components/form/Form";
import Field from "@/components/field/Field";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "@/utils/auth";
import { BASE_URL } from "@/constants";

function UserEdit() {
  const [email, setEmail] = useState({ value: "", status: "fulfilled" });
  const [nickname, setNickname] = useState({ value: "", status: "fulfilled" });
  const [password, setPassword] = useState({ value: "", status: "ready" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: "ready",
  });

  const [preventFormSubmit, setPreventFormSubmit] = useState(true);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization:
            getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
        },
      });
      setEmail((prev) => ({ ...prev, value: data.email }));
      setNickname((prev) => ({ ...prev, value: data.nickname }));
    } catch (error) {
      alert("로그인해주세요");
      navigate("/");
    }
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${BASE_URL}/users/me`,
        {
          nickname: nickname.value,
          password: password.value,
        },
        {
          headers: {
            Authorization:
              getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
          },
        }
      );
      navigate("/");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (
      nickname.status === "fulfilled" &&
      password.status === "fulfilled" &&
      passwordConfirm.status === "fulfilled"
    ) {
      setPreventFormSubmit(false);
      return;
    }
    setPreventFormSubmit(true);
  }, [nickname, password, passwordConfirm]);

  return (
    <StyledUserEditContainer>
      <h2>회원정보 수정</h2>
      <Form
        buttonText="확인"
        onSubmit={handleEditSubmit}
        preventFormSubmit={preventFormSubmit}
      >
        <Field
          labelName="아이디"
          type="email"
          placeholder={email.value}
          disabled
        />
        <Field
          labelName="닉네임"
          type="text"
          value={nickname.value}
          minLength={2}
          maxLength={8}
          onChange={validateNickname}
          errorMessage={nickname.status}
        />
        <Field
          labelName="비밀번호"
          type="password"
          minLength={8}
          maxLength={20}
          onChange={validatePassword}
          errorMessage={password.status}
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          minLength={8}
          maxLength={20}
          onChange={validatePasswordConfirm}
          errorMessage={passwordConfirm.status}
        />
      </Form>
      <div className="withdrawal">
        <Link to="/">회원탈퇴</Link>
      </div>
    </StyledUserEditContainer>
  );
}

export default UserEdit;
