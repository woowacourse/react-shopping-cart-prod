import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { USER_ACCESS_POLICY } from "../constants";

function AuthGuard({
  policy = USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER,
  children,
}) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);

  useEffect(() => {
    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER && !isLoggedIn) {
      navigate("/login", { replace: true });
    }
    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER && isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate, policy]);

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER && !isLoggedIn) {
    return <div>로그인 후 이용해 주세요</div>;
  }

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER && isLoggedIn) {
    return <div>로그아웃 후 이용해 주세요</div>;
  }

  return children;
}

export default AuthGuard;
