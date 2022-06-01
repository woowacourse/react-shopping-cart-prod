import { PageTitle } from 'components/common';
import UserPasswordUpdateForm from 'components/user/UserPasswordUpdateForm';
import React from 'react';

function UserPasswordUpdate() {
  return (
    <>
      <PageTitle>비밀번호 수정</PageTitle>
      <UserPasswordUpdateForm />
    </>
  );
}

export default UserPasswordUpdate;
