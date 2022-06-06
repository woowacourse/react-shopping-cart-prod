import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';

import useInputValidate from 'hooks/useInputValidate';
import useAuth from 'hooks/useAuth';
import useSnackBar from 'hooks/useSnackBar';

const useSignUpPage = () => {
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();

  const { isSignUpSucceed, isSignUpError, signUp, checkIsAuthenticated } =
    useAuth();

  const [emailValidate, handleEmailBlur] = useInputValidate('email');
  const [nameValidate, handleNameBlur] = useInputValidate('name');
  const [passwordValidate, handlePasswordBlur] = useInputValidate('password');
  const [passwordCheckValidate, handlePasswordCheckBlur] =
    useInputValidate('passwordCheck');

  const handleSignUp = (e) => {
    e.preventDefault();

    const isAllValid =
      emailValidate.isValid &&
      nameValidate.isValid &&
      passwordValidate.isValid &&
      passwordCheckValidate.isValid;

    if (!isAllValid) {
      showErrorSnackBar('정보를 올바르게 입력하세요.');
      return;
    }

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
    } = e.target.elements;

    signUp({
      email,
      name,
      password,
    });
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isSignUpSucceed) {
      navigate(PATH_NAME.LOGIN);
      showSuccessSnackBar('회원가입 성공');
      return;
    }
    if (isSignUpError) {
      showErrorSnackBar('입력한 정보를 확인 하세요.');
      return;
    }
  }, [isSignUpSucceed, isSignUpError]);
  return {
    handleSignUp,
    emailValidate,
    handleEmailBlur,
    nameValidate,
    handleNameBlur,
    passwordValidate,
    handlePasswordBlur,
    passwordCheckValidate,
    handlePasswordCheckBlur,
    passwordRef,
  };
};

export default useSignUpPage;
