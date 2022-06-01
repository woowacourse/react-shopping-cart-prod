import { PageTitle } from 'components/common';
import UserInfoUpdateForm from 'components/user/UserInfoUpdateForm';
import React from 'react';

function UserInfoUpdate() {
  return (
    <>
      <PageTitle>회원 정보 수정</PageTitle>
      <UserInfoUpdateForm />
    </>
  );
}

export default UserInfoUpdate;
