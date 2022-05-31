import React from 'react';

import { Form, Input, PageTemplate, PageTitle } from 'components/common';

function Register() {
  return (
    <PageTemplate>
      <PageTitle>회원가입</PageTitle>
      <Form buttonText="회원 가입" onSubmit={() => console.log('제출!')}>
        <Input
          type={'email'}
          labelText={'이메일 주소'}
          buttonText={'중복 확인'}
          onButtonClick={() => console.log('buttonClicked')}
        />
        <Input
          type={'email'}
          labelText={'이메일 주소'}
          buttonText={'중복 확인'}
          onButtonClick={() => console.log('buttonClicked')}
        />
        <Input
          type={'email'}
          labelText={'이메일 주소'}
          buttonText={'중복 확인'}
          onButtonClick={() => console.log('buttonClicked')}
        />
        <Input
          type={'email'}
          labelText={'이메일 주소'}
          buttonText={'중복 확인'}
          onButtonClick={() => console.log('buttonClicked')}
        />
      </Form>
    </PageTemplate>
  );
}

export default Register;
