import React from 'react';

import { PageTitle } from 'components/common';
import { LoginForm } from 'components/user';

function Login() {
  return (
    <>
      <PageTitle>로그인</PageTitle>
      <LoginForm />
    </>
  );
}

export default Login;
