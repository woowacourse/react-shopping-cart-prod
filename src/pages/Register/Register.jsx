import React from 'react';

import { PageTitle } from 'components/common';
import { RegisterForm } from 'components/user';

function Register() {
  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <RegisterForm />
    </>
  );
}

export default Register;
