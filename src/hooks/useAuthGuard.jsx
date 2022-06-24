import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { USER_ACCESS_POLICY } from "../constants";

const useAuthGuard = ({ policy = USER_ACCESS_POLICY.ONLY_LOGGED_IN }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userReducer.data.isLoggedIn);

  const checkUserAccessPolicy = useCallback(() => {
    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_IN && !isLoggedIn) {
      navigate("/login", { replace: true });
    }

    if (policy === USER_ACCESS_POLICY.ONLY_LOGGED_OUT && isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [policy, isLoggedIn, navigate]);

  return checkUserAccessPolicy;
};

export default useAuthGuard;
