import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MESSAGE, ROUTES_PATH } from '../constants';
import {
  actionTypes,
  userLoginAsync,
  userModifyPasswordAsync,
  userModifyUserInfoAsync,
  userSignUpAsync,
  userWithdrawAsync,
} from '../store/user/user.actions';

function useUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(({ user }) => user.accessToken);

  const userLogin = (loginInfo) => {
    dispatch(userLoginAsync(loginInfo));
    navigate(ROUTES_PATH.HOME);
  };

  const userSignUp = (signUpInfo) => {
    dispatch(userSignUpAsync(signUpInfo));
    navigate(ROUTES_PATH.LOGIN);
  };

  const userModifyPassword = (password) => {
    dispatch(userModifyPasswordAsync(password, accessToken));
  };

  const userModifyUserInfo = (userInfo) => {
    dispatch(userModifyUserInfoAsync(userInfo, accessToken));
    navigate(ROUTES_PATH.HOME);
  };

  const userWithdraw = () => {
    dispatch(userWithdrawAsync(accessToken));
  };

  const userLogOut = () => {
    dispatch({ type: actionTypes.DELETE_TOKEN_SUCCESS });
    alert(MESSAGE.LOGOUT_SUCCESS);
    navigate(ROUTES_PATH.HOME);
  };

  return {
    accessToken,
    userLogin,
    userSignUp,
    userModifyPassword,
    userModifyUserInfo,
    userWithdraw,
    userLogOut,
  };
}

export default useUser;
