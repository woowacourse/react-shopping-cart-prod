import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import useInput from "@/hooks/useInput";
import usePasswordConfirm from "@/hooks/usePasswordConfirm";

import Form from "@/components/Form";
import Field from "@/components/Field";

import { getCookie } from "@/utils/auth";
import { deleteCookie } from "@/utils/auth";

import {
  BASE_URL,
  PATH,
  STATUS,
  INPUT_TYPE,
  MESSAGE,
  NICKNAME,
  PASSWORD,
} from "@/constants";

import StyledUserEditContainer from "@/pages/UserEdit/index.style";

function UserEdit() {
  const [email, setEmail] = useState({ value: "", status: STATUS.FULFILLED });
  const [nickname, onChangeNickname, setNickname] = useInput(
    INPUT_TYPE.NICKNAME,
    STATUS.FULFILLED
  );
  const [password, onChangePassword] = useInput(
    INPUT_TYPE.PASSWORD,
    STATUS.READY
  );
  const [passwordConfirm, onChangePasswordConfirm] = usePasswordConfirm();
  const [preventFormSubmit, setPreventFormSubmit] = useState(true);

  const dispatch = useDispatch();
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
      dispatch(toggleSnackbarOpen(MESSAGE.NOT_AUTHORIZED));
      navigate(PATH.MAIN);
    }
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
      navigate(PATH.MAIN);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdrawalClick = async (e) => {
    if (confirm(MESSAGE.WITHDRAWAL_CONFIRM)) {
      try {
        await axios.delete(`${BASE_URL}/users/me`, {
          headers: {
            Authorization:
              getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
          },
        });

        deleteCookie("accessToken");
        navigate(PATH.MAIN);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (
      nickname.status === STATUS.FULFILLED &&
      password.status === STATUS.FULFILLED &&
      passwordConfirm.status === STATUS.FULFILLED
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
          minLength={NICKNAME.MIN_LENGTH}
          maxLength={NICKNAME.MAX_LENGTH}
          onChange={onChangeNickname}
          errorMessage={nickname.status}
        />
        <Field
          labelName="비밀번호"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={onChangePassword}
          errorMessage={password.status}
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={(e) => {
            onChangePasswordConfirm(e, password);
          }}
          errorMessage={passwordConfirm.status}
        />
      </Form>
      <div className="withdrawal">
        <a onClick={handleWithdrawalClick}>회원탈퇴</a>
      </div>
    </StyledUserEditContainer>
  );
}

export default UserEdit;
