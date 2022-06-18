import { useState } from "react";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookie";

function useToken() {
  const [token, setToken] = useState(getCookie("accessToken"));

  const deleteToken = () => {
    deleteCookie("accessToken");
    setToken("");
  };

  const saveToken = (accessToken) => {
    setCookie("accessToken", accessToken);
    setToken(getCookie("accessToken"));
  };

  return [token, deleteToken, saveToken];
}

export default useToken;
