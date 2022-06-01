import React from 'react';

import { PageTemplate, PageTitle } from 'components/common';
import { RegisterForm } from 'components/user';

function Register() {
  return (
    <PageTemplate>
      <PageTitle>회원가입</PageTitle>
      <RegisterForm />
    </PageTemplate>
  );
}

export default Register;
