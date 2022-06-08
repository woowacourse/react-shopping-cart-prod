import { useState } from 'react';

const useUserForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [passwords, setPasswords] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [userInfo, setUserInfo] = useState({});
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const handleUserInfoChange = (setState, key) => (e) => {
    setState((prevState) => {
      return { ...prevState, [key]: e.target.value };
    });
  };

  return {
    loginInfo,
    setLoginInfo,
    passwords,
    setPasswords,
    userInfo,
    setUserInfo,
    signUpInfo,
    setSignUpInfo,
    handleUserInfoChange,
  };
};

export default useUserForm;
