import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { PATH_NAME, AUTHORIZATION_TYPE } from 'constants';

import useAuthentication from 'hooks/useAuthentication';
import useAuthorization from 'hooks/useAuthorization';
import useSnackBar from 'hooks/useSnackBar';

const useLoginPage = () => {
  useAuthorization(AUTHORIZATION_TYPE.PUBLIC_ONLY);
  const navigate = useNavigate();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
  const { isLoginSucceed, isLoginError, login } = useAuthentication();

  const handleLogin = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target.elements;
    if (email.length === 0 || password.length === 0) {
      showErrorSnackBar('정보를 올바르게 입력하세요.');
      return;
    }
    login(email, password);
  };

  useEffect(() => {
    if (isLoginSucceed) {
      showSuccessSnackBar('로그인 성공');
      navigate(PATH_NAME.HOME);
      return;
    }

    if (isLoginError) {
      showErrorSnackBar('로그인 실패');
    }
  }, [isLoginSucceed, isLoginError]);

  return { handleLogin };
};

export default useLoginPage;
