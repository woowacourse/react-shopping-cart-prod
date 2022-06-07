import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthGuard({ children }) {
  const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("접근할 수 없습니다!");
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>접근 불가능한 페이지입니다</div>;

  return children;
}

export default AuthGuard;
