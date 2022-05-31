import React from 'react';

import { Input, PageTemplate, PageTitle } from 'components/common';

function Register() {
  return (
    <PageTemplate>
      <PageTitle>회원가입</PageTitle>
      <Input
        type={'email'}
        labelText={'이메일 주소'}
        buttonText={'중복 확인'}
        onButtonClick={() => console.log('buttonClicked')}
      />
    </PageTemplate>
  );
}

export default Register;
