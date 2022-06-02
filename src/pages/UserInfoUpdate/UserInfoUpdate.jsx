import React from 'react';

import { PageTitle } from 'components/common';

import { UserInfoUpdateForm } from 'components/user';

function UserInfoUpdate() {
  return (
    <>
      <PageTitle>회원 정보 수정</PageTitle>
      <UserInfoUpdateForm />
    </>
  );
}

export default UserInfoUpdate;
