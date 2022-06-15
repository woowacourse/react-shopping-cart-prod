import { useEffect } from "react";
import { useSelector } from "react-redux";

import { USER_ACCESS_POLICY } from "../constants";

function AuthGuard({
  policy = USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER,
  children,
}) {
  const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);

  useEffect(() => {
    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER && !isLoggedIn) {
      alert("접근할 수 없습니다!");
      window.location.href = "/login";
    }
    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER && isLoggedIn) {
      alert("접근할 수 없습니다!");
      window.location.href = "/";
    }
  }, [isLoggedIn, policy]);

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER && !isLoggedIn) {
    return <div>로그인 후 이용해 주세요</div>;
  }

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER && isLoggedIn) {
    return <div>로그아웃 후 이용해 주세요</div>;
  }

  return children;
}

export default AuthGuard;
