import { useEffect } from "react";
import { useSelector } from "react-redux";
import { accessPolicy } from "./constants";

// accessPolicy = "all" | "onlyLoggedInUser" | "onlyLoggedOutUser"
function AuthGuard({ policy = accessPolicy.onlyLoggedInUser, children }) {
  const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);

  useEffect(() => {
    if (policy === accessPolicy.onlyLoggedInUser && !isLoggedIn) {
      alert("접근할 수 없습니다!");
      window.location.href = "/login";
    }
    if (policy === accessPolicy.onlyLoggedOutUser && isLoggedIn) {
      alert("접근할 수 없습니다!");
      window.location.href = "/";
    }
  }, [isLoggedIn, policy]);

  if (policy === accessPolicy.onlyLoggedInUser && !isLoggedIn) {
    return <div>로그인 후 이용해 주세요</div>;
  }

  if (policy === accessPolicy.onlyLoggedOutUser && isLoggedIn) {
    return <div>로그아웃 후 이용해 주세요</div>;
  }

  return children;
}

export default AuthGuard;
