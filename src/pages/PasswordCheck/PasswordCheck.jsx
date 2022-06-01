import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { PageTitle } from 'components/common';
import PasswordCheckForm from 'components/user/PasswordCheckForm';

function PasswordCheck() {
  const { state } = useLocation();

  return state === null || state.isValid === false ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <PageTitle>비밀번호 확인</PageTitle>
      <PasswordCheckForm nextPath={state.nextPath} />
    </>
  );
}

export default PasswordCheck;
