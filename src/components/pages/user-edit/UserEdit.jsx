import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import Form from "@/components/common/form/Form";
import Field from "@/components/common/field/Field";

import useToken from "@/hooks/useToken";

import {
  PATH,
  STATUS,
  ERROR_STATUS,
  MESSAGE,
  NICKNAME,
  PASSWORD,
  REGULAR_EXPRESSION,
} from "@/constants";

import StyledUserEditContainer from "@/components/pages/user-edit/UserEdit.style";

function UserEdit() {
  const [email, setEmail] = useState({ value: "", status: STATUS.FULFILLED });
  const [nickname, setNickname] = useState({
    value: "",
    status: STATUS.FULFILLED,
  });
  const [password, setPassword] = useState({ value: "", status: STATUS.READY });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    status: STATUS.READY,
  });

  const dispatch = useDispatch();
  const [preventFormSubmit, setPreventFormSubmit] = useState(true);
  const [token, deleteToken] = useToken();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/users/me`, {
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      });
      setEmail((prev) => ({ ...prev, value: data.email }));
      setNickname((prev) => ({ ...prev, value: data.nickname }));
    } catch (error) {
      dispatch(toggleSnackbarOpen(MESSAGE.NOT_AUTHORIZED));
      navigate(PATH.MAIN);
    }
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/users/me`,
        {
          nickname: nickname.value,
          password: password.value,
        },
        {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        }
      );
      navigate(PATH.MAIN);
      location.reload();
    } catch (error) {
      dispatch(toggleSnackbarOpen(error));
    }
  };

  const handleWithdrawalClick = async (e) => {
    if (confirm(MESSAGE.WITHDRAWAL_CONFIRM)) {
      try {
        await axios.delete(`/users/me`, {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        });

        deleteToken();
        navigate(PATH.MAIN);
        location.reload();
      } catch (error) {
        dispatch(toggleSnackbarOpen(error));
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
          onChange={validateNickname}
          errorMessage={nickname.status}
        />
        <Field
          labelName="비밀번호"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={validatePassword}
          errorMessage={password.status}
        />
        <Field
          labelName="비밀번호 확인"
          type="password"
          minLength={PASSWORD.MIN_LENGTH}
          maxLength={PASSWORD.MAX_LENGTH}
          onChange={validatePasswordConfirm}
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
