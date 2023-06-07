import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { api } from "../api";
import { KEY_LOCALSTORAGE_LOGIN_TOKEN } from "../constants";
import { loginState } from "../recoil/atom";
import { ROUTER_PATH } from "../router";
import { setLocalStorage } from "../utils";
import { useLocalProducts } from "./useLocalProducts";
import { useToast } from "./useToast";

export const useLoginForm = () => {
  const { showToast } = useToast();
  const { updateLocalProducts } = useLocalProducts();
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
    e.preventDefault();
    try {
      const base64 = btoa(username + ":" + password);
      setLocalStorage(KEY_LOCALSTORAGE_LOGIN_TOKEN, base64);
      const response = await api.post("/auth/login");
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      setIsLogined(true);
      await updateLocalProducts();
      navigate(ROUTER_PATH.Main);
    } catch (error: any) {
      localStorage.clear();
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.clear();
    setIsLogined(false);
    navigate(ROUTER_PATH.Main);
    showToast("success", `로그아웃 되었습니다. ✅`);
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
