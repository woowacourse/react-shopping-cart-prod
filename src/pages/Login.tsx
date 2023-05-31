import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { Button, Page } from "../components";
import { KEY_LOCALSTORAGE_LOGIN_TOKEN } from "../constants";
import { useRouter } from "../hooks/useRouter";
import { localProductsState, loginState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { setLocalStorage } from "../utils";
import { makeLocalProducts } from "../utils/domain";

const Login = () => {
  const { goPage } = useRouter();
  const setLoginState = useSetRecoilState(loginState);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && usernameRef.current instanceof HTMLInputElement)
      usernameRef.current.focus();
  };

  const submitUser = async (e: React.FormEvent) => {
    const base64 = btoa(username + ":" + password);

    setLocalStorage(KEY_LOCALSTORAGE_LOGIN_TOKEN, base64);
    e.preventDefault();

    // 로그인 성공 시
    setLoginState(true);
    goPage(ROUTER_PATH.Main)();

    // 로그인 실패 시
    // localStorage.clear();
  };

  return (
    <Page>
      <FormContainer onSubmit={submitUser}>
        <p>LOGIN</p>
        <label>
          아이디<span>*</span>
        </label>
        <CustomInput
          id="username"
          ref={usernameRef}
          value={username}
          autoFocus
          required
          onChange={handleUsernameChanged}
          maxLength={20}
          placeholder="아이디 혹은 이메일을 입력해 주세요."
        />
        <label>
          비밀번호<span>*</span>
        </label>
        <CustomInput
          id="password"
          ref={passwordRef}
          value={password}
          onChange={handlePasswordChanged}
          minLength={4}
          maxLength={20}
          type="password"
          required
          placeholder="비밀번호를 입력해 주세요."
          onKeyDown={handlePasswordKey}
        />
        <Button type="submit">로그인 하기</Button>
        <Button type="button" onClick={goPage(ROUTER_PATH.Main)}>
          다시 상품 목록 보러가기
        </Button>
      </FormContainer>
    </Page>
  );
};

const CustomInput = styled.input`
  width: 90%;
  height: 40px;

  font-size: 15px;
  color: black;

  padding: 0 10px;

  background: #ecebf1;
  border-radius: 7px;
  border: none;

  &:focus {
    outline-color: #525252;
  }

  &::placeholder {
    font-size: 13px;
    color: gray;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  margin-top: 40px;

  width: 300px;
  height: auto;

  & > label {
    align-self: flex-start;
    font-weight: 500;
    font-size: 12px;
    color: #525252;
    margin: 20px 0 5px 20px;

    & > span {
      color: red;
      margin-left: 3px;
    }
  }

  & > p {
    align-self: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const ValidationBox = styled.p`
  margin: 5px 2px;
  font-size: 10px;
  color: red;
`;

export default Login;
