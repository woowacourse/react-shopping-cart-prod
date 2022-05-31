import React from 'react';

import { Form, Input, PageTemplate, PageTitle } from 'components/common';

function Register() {
  const inputDescriptionList = [
    {
      name: 'email',
      type: 'email',
      labelText: '이메일 주소',
      placeholder: 'example@woowacourse.com',
      buttonText: '중복 확인',
      onButtonClick: () => console.log('중복확인 버튼 클릭'),
    },
    {
      name: 'password',
      type: 'password',
      labelText: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
    },
    {
      name: 'password-confirm',
      type: 'password',
      labelText: '비밀번호 확인',
      placeholder: '비밀번호를 다시 입력해주세요',
    },
    {
      name: 'nickname',
      type: 'text',
      labelText: '닉네임',
      placeholder: '블링',
    },
  ];
  return (
    <PageTemplate>
      <PageTitle>회원가입</PageTitle>
      <Form buttonText="회원 가입" onSubmit={() => console.log('제출!')}>
        {inputDescriptionList.map((inputDescription) => (
          <Input key={inputDescription.name} {...inputDescription} />
        ))}
      </Form>
    </PageTemplate>
  );
}

export default Register;
