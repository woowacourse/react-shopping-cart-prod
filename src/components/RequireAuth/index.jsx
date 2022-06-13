import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { StatusMessage } from 'components/@common';

import { PAGE_LIST } from 'constants/';

function RequireAuth({ isAllow, isDeniedPageEnabled = false }) {
  const { pathname, search } = useLocation();
  const { isLoaded, error: errorMessage } = useSelector(({ user }) => user.userInfoAsyncState);

  if (isLoaded === false && !errorMessage) {
    return <StatusMessage status="loading">회원 정보를 불러오고 있습니다.</StatusMessage>;
  }

  if (isAllow === false) {
    return (
      <Navigate
        to={isDeniedPageEnabled ? PAGE_LIST.ACCESS_DENIED : PAGE_LIST.HOME}
        state={{ targetUrl: pathname + search }}
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
