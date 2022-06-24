import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { USER_ACCESS_POLICY } from "../constants";

function AuthGuard({ policy = USER_ACCESS_POLICY.ONLY_LOGGED_IN, children }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userReducer.data.isLoggedIn);

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN && !isLoggedIn) {
    navigate("/login", { replace: true });
    return <div>로그인 후 이용해 주세요</div>;
  }

  if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT && isLoggedIn) {
    navigate("/", { replace: true });
    return <div>로그아웃 후 이용해 주세요</div>;
  }

  return children;
}

export default AuthGuard;
