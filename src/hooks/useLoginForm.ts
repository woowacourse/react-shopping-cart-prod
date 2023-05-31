import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { KEY_LOCALSTORAGE_LOGIN_TOKEN } from "../constants";
import { loginState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { setLocalStorage } from "../utils";
import { useToast } from "./useToast";

export const useLoginForm = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const setIsLogined = useSetRecoilState(loginState);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);

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

  const handleFormSubmitted = async (e: React.FormEvent) => {
    const base64 = btoa(username + ":" + password);

    setLocalStorage(KEY_LOCALSTORAGE_LOGIN_TOKEN, base64);
    e.preventDefault();

    // 로그인 성공 시
    setIsLogined(true);
    navigate(ROUTER_PATH.Main);

    // 로그인 실패 시
    // localStorage.clear();
  };

  const logout = () => {
    localStorage.clear();
    setIsLogined(false);
    showToast("success", `로그아웃 되었습니다. ✅`);
    navigate(ROUTER_PATH.Main);
  };

  return {
    username,
    password,
    usernameRef,
    handleUsernameChanged,
    handlePasswordChanged,
    handlePasswordKey,
    handleFormSubmitted,
    logout,
  } as const;
};
