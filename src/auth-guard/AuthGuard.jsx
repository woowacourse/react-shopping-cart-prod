import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getUser } from "@redux/reducers/user-reducer/userThunks";
import AccessTokenStorage from "@storage/accessTokenStorage";
import { accessPolicy } from "./constants";

// accessPolicy = "all" | "onlyLoggedInUser" | "onlyLoggedOutUser"
function AuthGuard({ policy = accessPolicy.onlyLoggedInUser, children }) {
  const dispatch = useDispatch();
  const store = useStore();
  const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);

  useEffect(() => {
    (async () => {
      const accessToken = AccessTokenStorage.get();
      accessToken && (await dispatch(getUser()));

      const state = store.getState();
      const { isLoggedIn } = state.user.data;

      if (policy === accessPolicy.onlyLoggedInUser && !isLoggedIn) {
        alert("접근할 수 없습니다!");
        window.location.href = "/login";
      }

      if (policy === accessPolicy.onlyLoggedOutUser && isLoggedIn) {
        alert("접근할 수 없습니다!");
        window.location.href = "/";
      }
    })();
  }, [dispatch, store, policy]);

  if (policy === accessPolicy.onlyLoggedInUser && !isLoggedIn) {
    return <div>로그인 후 이용해 주세요</div>;
  }

  if (policy === accessPolicy.onlyLoggedOutUser && isLoggedIn) {
    return <div>로그아웃 후 이용해 주세요</div>;
  }

  return children;
}

export default AuthGuard;
