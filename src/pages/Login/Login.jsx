import React from 'react';

import { PageTemplate, PageTitle } from 'components/common';
import { LoginForm } from 'components/user';

function Login() {
  return (
    <PageTemplate>
      <PageTitle>로그인</PageTitle>
      <LoginForm />
    </PageTemplate>
  );
}

export default Login;
